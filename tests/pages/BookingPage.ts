import { Page } from "playwright";
import { BasePage } from "./BasePage";
import { testData } from "../config/dateData";

export class BookingPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    async setGuests(adults: number, children: number) {
        await this.page.click('[data-testid="occupancy-config"]');

        // Adults
        const adultCount = this.page.locator('input#group_adults');

        let currentAdults = parseInt(await adultCount.inputValue());

        while (currentAdults < adults) {
            await this.page.getByLabel("Increase number of Adults").click();
            currentAdults++;
        }

        // Children
        const childCount = this.page.locator('input#group_children');

        let currentChildren = parseInt(await childCount.inputValue());

        while (currentChildren < children) {
            await this.page.getByLabel("Increase number of Children").click();
            currentChildren++;
        }

        await this.page.getByRole("button", { name: "Done" }).click();
    }

    async searchHotel() {
        await this.navigate("https://www.booking.com");

        await this.page.waitForLoadState('networkidle')

        const popup = this.page.getByRole('button', { name: 'Dismiss sign-in info.' })
        if (await popup.isVisible()) {
            await popup.click({ delay: 2000 })
        }

        await this.page.fill('input[name="ss"]', testData.city);

        await this.page.getByTestId('searchbox-dates-container').click()
        await this.page.locator("//span[@role='button' and @data-date='2026-03-01']").click()
        await this.page.locator("//span[@role='button' and @data-date='2026-03-05']").click()


        await this.page.getByTestId('occupancy-config').click()
        const adultCount = this.page.locator("//span[@class='e32aa465fd']").nth(0);
        const childrenCount = this.page.locator("//span[@class='e32aa465fd']").nth(1);

        await this.page.press('input[name="ss"]', "Enter");

        await this.page.waitForLoadState("networkidle");
    }

    async getTopHotelPrice(): Promise<number> {
        // Filter 5-star
        
        const hotelCards = this.page.locator("//div[@data-testid='property-card']");
        const count = await hotelCards.count();

        let fiveStarHotels: { name: string; price: number }[] = [];

        for (let i = 0; i < count; i++) {
            const card = hotelCards.nth(i);

            // Check if this card has 5-star rating
            const rating = card.locator("//div[@aria-label='5 out of 5']");

            if (await rating.count() > 0) {

                const name = await card.locator("//div[@data-testid='title']").innerText();

                const priceText = await card
                    .locator("//span[@data-testid='price-and-discounted-price']")
                    .innerText();

                const price = parseInt(priceText.replace(/[^0-9]/g, ''));

                fiveStarHotels.push({ name, price });
            }
        }

        // Sort lowest price first
        fiveStarHotels.sort((a, b) => a.price - b.price);

        if (fiveStarHotels.length > 0) {
            console.log("Cheapest 5-star hotel:", fiveStarHotels[0].name);
        }


        const firstHotel = this.page.locator('[data-testid="property-card"]').first();

        const priceText = await firstHotel
            .locator('[data-testid="price-and-discounted-price"]')
            .innerText();

        const price = parseInt(priceText.replace(/[^\d]/g, ""));

        return price;
    }
}