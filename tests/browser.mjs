import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
const browser=await chromium.launch({headless:true});
const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.goto('http://127.0.0.1:5173/');await page.waitForFunction(()=>window.envMotion);
await page.evaluate(()=>window.documentSentinel='persistent');
for(let i=0;i<3;i++){
 await page.locator('.button').click();await page.waitForURL('**/demo/second.html');await page.waitForFunction(()=>document.querySelector('main')?.style.opacity!=='0');await page.waitForTimeout(500);
 assert.match(await page.locator('h1').innerText(),/Une nouvelle page/);assert.equal(await page.evaluate(()=>window.documentSentinel),'persistent');
 await page.locator('.button').click();await page.waitForURL('http://127.0.0.1:5173/');await page.waitForTimeout(500);
 await page.locator('[data-env-faq="2"]').click();assert.equal(await page.locator('[data-env-faq="2"]').getAttribute('aria-expanded'),'true');
}
await page.goBack();await page.waitForTimeout(600);assert.match(await page.locator('h1').innerText(),/Une nouvelle page/);
await page.emulateMedia({reducedMotion:'reduce'});await page.locator('.button').click();await page.waitForURL('http://127.0.0.1:5173/');await page.waitForTimeout(300);
await page.screenshot({path:'docs/demo.png',fullPage:true});
await page.evaluate(()=>{window.envMotion.destroy();window.envMotion.destroy();});assert.deepEqual(errors,[]);
console.log('PASS: 3 round trips without reload, FAQ remount, history, reduced motion, idempotent destroy; no page errors.');
await browser.close();
