
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function FAQ() {
  return (
    <div className="p-6 max-w-4xl mx-auto animate-fade-in">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          Frequently Asked Questions
        </h1>
        <p className="text-muted-foreground mt-2">
          Everything you need to know about the platform
        </p>
      </div>

      <div className="space-y-8">
        {/* General & Pricing */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-foreground/80">General & Pricing</h2>
          <Accordion type="single" collapsible className="w-full bg-card rounded-lg border px-4">
            <AccordionItem value="item-1">
              <AccordionTrigger>How much does the platform cost?</AccordionTrigger>
              <AccordionContent>
                We offer a simple, all-inclusive monthly plan for $29/month. This gives you full access to advanced analytics, trend tracking, and our AI content tools.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Can I generate content for my posts here?</AccordionTrigger>
              <AccordionContent>
                Yes! Our built-in AI Content Generator creates high-quality blog posts and video scripts tailored to your specific niche in seconds.
              </AccordionContent>
            </AccordionItem>
             <AccordionItem value="item-3" className="border-b-0">
              <AccordionTrigger>Is there a free trial available?</AccordionTrigger>
              <AccordionContent>
                We typically offer a 7-day trial so you can experience the full power of our AI tools and analytics dashboard before committing to the monthly plan.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        {/* Analytics & Data */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-foreground/80">Analytics & Data</h2>
          <Accordion type="single" collapsible className="w-full bg-card rounded-lg border px-4">
            <AccordionItem value="analytics-1">
              <AccordionTrigger>What specific metrics can I track?</AccordionTrigger>
              <AccordionContent>
                You can track real-time data on Total Followers, Reach, Impressions, and Engagement Rate, along with granular metrics like Post Clicks.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="analytics-2">
              <AccordionTrigger>Does the platform show historical data?</AccordionTrigger>
              <AccordionContent>
                Yes, our "Engagement Over Time" graph visualizes likes, comments, and shares over the last 30 days, showing percentage growth compared to the previous month.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="analytics-3" className="border-b-0">
              <AccordionTrigger>Can I see where my audience is coming from?</AccordionTrigger>
              <AccordionContent>
                Absolutely. Our "Followers from Location" feature breaks down your audience demographics to help you target specific regions effectively.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        {/* Trends & Growth */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-foreground/80">Trends & Growth</h2>
          <Accordion type="single" collapsible className="w-full bg-card rounded-lg border px-4">
             <AccordionItem value="trends-1">
              <AccordionTrigger>How does the "Current Trends" feature work?</AccordionTrigger>
              <AccordionContent>
                We analyze real-time data to highlight trending hashtags in your niche (like #TravelGram or #TechNews), helping you create relevant content that ranks.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="trends-2" className="border-b-0">
              <AccordionTrigger>Does it support multiple social media platforms?</AccordionTrigger>
              <AccordionContent>
                Yes, our "Analytics Overview" aggregates your performance across major platforms so you can manage your entire digital presence in one place.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </div>
    </div>
  );
}
