# SocialPulse 🚀
### The Ultimate Social Media Analytics & AI Content Hub

![License](https://img.shields.io/badge/License-MIT-blue.svg) ![Version](https://img.shields.io/badge/Version-1.0.0-green.svg) ![Status](https://img.shields.io/badge/Status-Active-brightgreen.svg)

**SocialPulse** is a comprehensive social media analytics dashboard designed for influencers, businesses, and content creators. It aggregates data from multiple platforms to provide real-time insights into audience growth, engagement, and revenue.

What sets SocialPulse apart is its **Integrated AI Content Generator**, allowing users to not just analyze past performance but instantly generate high-performing content for future posts.

---

## 🌟 Key Features

### 📊 Comprehensive Analytics Dashboard
* **Total Followers Tracker:** Monitor growth trends across Instagram, Twitter, LinkedIn, and Facebook in one unified graph.
* **Engagement Metrics:** Deep dive into **Likes, Shares, and Impressions** to understand exactly what content resonates with your audience.
* **Revenue Tracking:** Visualize earnings from ad revenue, sponsorships, and affiliate links with monthly and yearly projections.

### 🌍 Geographic Insights
* **User Location Analytics:** Interactive heatmaps showing where your audience is based (Country, City, and Region) to help tailor content to specific time zones and cultures.

### 🤖 AI Content Generator (Flagship Feature)
* **Smart Caption Creator:** Generate engaging captions based on trending keywords and your specific niche.
* **Idea to Post:** Input a simple topic, and the AI generates a full post structure including hashtags, hooks, and call-to-actions (CTAs).
* **Tone Adjustment:** Select content tone (e.g., Professional, Witty, Inspirational) to match your brand voice.

---

## 🛠️ Tech Stack

* **Frontend:** React.js / Next.js, Tailwind CSS, Chart.js (for data visualization)
* **Backend:** Node.js / Express.js
* **Database:** locally stored(src/data/mockData.ts)
* **AI Integration:**  Gemini API
* **Authentication:** JWT / Firebase Auth

---



## 🚀 Installation & Setup

Follow these steps to run SocialPulse locally:

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/blacsheep-wq/socialpulse.git](https://github.com/blacsheep-wq/socialpulse.git)
    cd socialpulse
    ```

2.  **Install Dependencies**
    ```bash
    # For Backend
    cd server
    npm install

    # For Frontend
    cd ../client
    npm install
    ```

3.  **Environment Variables**
    Create a `.env` file in the root directory and add the following:
    ```env
    PORT=3001
    Database_URI=src/data/mockData.ts
    GEMINI_API=AIzaSyA4Tn1a6_uUx5-W1BCzARGq7z8L0dNc-Y
    ```

4.  **Run the App**
    ```bash
    # Run Backend
    npm start

    # Run Frontend (in a separate terminal)
    npm run dev
    ```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 📞 Contact

**Project Lead:** Krishna Tripathi
**Email:** learning.me955@gmail.com
**Project Link:** [https://github.com/blacsheep-wq/socialpulse](https://github.com/blacsheep-wq/socialpulse)
