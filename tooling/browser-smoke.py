"""Run against managed dev preview, or a static Pages-mode build served locally.

Usage: python tooling/browser-smoke.py URL [public]
Requires Python Playwright and an installed Chrome executable.
"""
import asyncio
import json
import os
from pathlib import Path
import sys
from playwright.async_api import async_playwright, expect

BASE = sys.argv[1] if len(sys.argv) > 1 else 'http://localhost:4200/'
PUBLIC = len(sys.argv) > 2 and sys.argv[2] == 'public'
ROOT = BASE.rstrip('/')
OUT = Path('/tmp/easy-ai-tests')
OUT.mkdir(exist_ok=True)

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(executable_path=os.environ.get('CHROME_PATH', '/usr/bin/google-chrome'), args=['--no-sandbox'])
        context = await browser.new_context(viewport={'width':1440,'height':1000}, permissions=['clipboard-read','clipboard-write'])
        page = await context.new_page()
        errors = []
        failed = []
        page.on('pageerror', lambda e: errors.append(str(e)))
        page.on('response', lambda r: failed.append(f'{r.status} {r.url}') if r.status >= 400 else None)
        await page.emulate_media(reduced_motion='reduce')
        async def route(path):
            target = f'{ROOT}/#{path}' if PUBLIC else (ROOT + path)
            await page.goto(target, wait_until='networkidle')

        await route('/')
        await expect(page.get_by_role('heading', name='THE EASY AI ENTHUSIAST')).to_be_visible()
        await expect(page.locator('.section-tile')).to_have_count(4)
        await page.screenshot(path=str(OUT / ('public-desktop.png' if PUBLIC else 'dev-desktop.png')), full_page=True, animations='disabled')
        for path, title in [('/prompts','AI Prompts.'),('/guides','Guides.'),('/agents','Agents.'),('/tasks','Tasks.')]:
            await route(path)
            await expect(page.get_by_role('heading', name=title, exact=True)).to_be_visible()
            await expect(page.locator('.resource-card')).to_have_count(6)

        await route('/library')
        await expect(page.locator('.resource-card')).to_have_count(24)
        await page.get_by_label('Search this library').fill('adversarial strategy lab')
        await expect(page.locator('.resource-card')).to_have_count(1)
        await page.get_by_label('Search this library').fill('no-such-resource-xyz')
        await expect(page.get_by_role('heading', name='No ideas found here—yet.')).to_be_visible()
        await page.get_by_role('button', name='Reset filters').click()
        await expect(page.locator('.resource-card')).to_have_count(24)
        await page.get_by_label('Filter by resource type').select_option('agent')
        await expect(page.locator('.resource-card')).to_have_count(6)

        await route('/resource/adversarial-strategy-lab')
        await expect(page.get_by_role('heading', name='The adversarial strategy lab', exact=True)).to_be_visible()
        await page.get_by_role('button', name='Copy prompt', exact=True).click()
        await expect(page.get_by_role('button', name='Copied to clipboard')).to_be_visible()
        assert 'strategy reviewer' in await page.evaluate('navigator.clipboard.readText()')
        async with page.expect_download() as download_info:
            await page.get_by_role('button', name='Download .txt').click()
        download = await download_info.value
        assert download.suggested_filename == 'adversarial-strategy-lab.txt'
        await page.reload(wait_until='networkidle')
        await expect(page.get_by_role('heading', name='The adversarial strategy lab', exact=True)).to_be_visible()

        await route('/resource/nonexistent')
        await expect(page.get_by_role('heading', name='Resource not found')).to_be_visible()
        await route('/workspace')
        await expect(page.get_by_role('heading', name='Your workspace needs its secure connection.')).to_be_visible()
        assert await page.locator('input[type="password"]').count() == 0

        await route('/')
        await page.keyboard.press('/')
        await expect(page.get_by_label('Search all resources')).to_be_focused()
        await page.get_by_label('Search all resources').fill('retrieval')
        await expect(page.get_by_role('heading', name='The resource library.')).to_be_visible()
        assert await page.locator('.resource-card').count() > 0
        await page.get_by_label('Search all resources').fill('')

        await route('/')
        for width in [1440,1024,768,390,320]:
            await page.set_viewport_size({'width':width,'height':900})
            await page.evaluate('document.fonts.ready')
            assert await page.evaluate('document.documentElement.scrollWidth') <= width, f'Overflow at {width}px'
        await page.set_viewport_size({'width':390,'height':844})
        await page.get_by_role('button', name='Open navigation').click()
        await expect(page.locator('.sidebar').get_by_role('button', name='Close navigation', exact=True)).to_be_focused()
        await page.keyboard.press('Escape')
        await expect(page.get_by_role('button', name='Open navigation')).to_be_focused()
        await page.screenshot(path=str(OUT / ('public-mobile.png' if PUBLIC else 'dev-mobile.png')), full_page=True, animations='disabled')
        assert not errors, errors
        assert not failed, failed
        result = {'mode':'public-static' if PUBLIC else 'managed-dev','passed':True,'resources':24,'errors':errors,'httpFailures':failed,'checks':['four sections','search/empty/reset/type filter','copy clipboard','text download','refresh/detail','missing-resource state','honest workspace status','keyboard search','mobile focus/Escape','320–1440px overflow','base-path assets']}
        print(json.dumps(result, indent=2))
        (OUT / ('public-results.json' if PUBLIC else 'dev-results.json')).write_text(json.dumps(result, indent=2))
        await browser.close()

asyncio.run(main())