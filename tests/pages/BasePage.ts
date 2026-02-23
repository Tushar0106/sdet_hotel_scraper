import { Page } from "playwright";

export class BasePage {
  constructor(protected page: Page) {}

  async navigate(url: string) {
    await this.page.goto(url, { waitUntil: "domcontentloaded" });
  }
}