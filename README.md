# 🏨 SDET Hotel Price Scraper (SAT Assignment)

## 📌 Overview

This project is a web automation scraper built using **Playwright + TypeScript** following the **Page Object Model (POM)** design pattern.

It identifies the **lowest listing price** for a 5-night stay at a **highest-rated 5-star hotel** in a selected city for:

- 👨‍👩‍👧 2 Adults
- 👶 1 Infant/Child (< 2 years)
- 📅 Future date range within the current year
- 💰 Currency: INR

The solution automates hotel search on booking platforms and extracts pricing data programmatically.

---

## 🎯 Objective (SAT Requirement)

Return the website offering the **lowest listing price** for:

✔ Highest-rated 5-star hotel  
✔ 5-night stay  
✔ 2 adults + 1 infant  
✔ Future dates  
✔ Any given city  
✔ Currency INR  

---

## 🛠️ Tech Stack

- **Language:** TypeScript
- **Automation:** Playwright
- **Design Pattern:** Page Object Model (POM)
- **Runtime:** Node.js
- **Test Runner:** Playwright Test

---

## 📂 Run Project
npx playwright test hotelScraper
