import { Reveal } from "../components/ui/Reveal";

export default function Terms() {
  const lastUpdated = "February 1, 2026";

  const sections = [
    {
      title: "1. Acceptance of Terms",
      content:
        "By accessing or using the F1Insight platform, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you must not use our engineered analytics services.",
    },
    {
      title: "2. Analytical Data & Accuracy",
      content:
        "F1Insight provides high-performance data visualizations and race predictions based on historical telemetry and statistical modeling. While we strive for engineering-grade precision, we do not guarantee the absolute accuracy of predictions or data streams.",
    },
    {
      title: "3. User Conduct",
      content:
        "Users must utilize the platform in a professional manner. Any attempt to disrupt the data delivery systems, scrape telemetry at unauthorized rates, or compromise system integrity will result in immediate termination of access.",
    },
    {
      title: "4. Intellectual Property",
      content:
        "All visual styles, code, and analytical models are the property of F1Insight. F1 racing data is used under fair use for analysis, and brand assets remain the property of their respective owners.",
    },
    {
      title: "5. Limitation of Liability",
      content:
        "F1Insight shall not be liable for any losses incurred from reliance on our predictive models. Data is provided 'as-is' for enthusiasts and analysts.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <Reveal width="100%">
        <h1 className="font-orbitron text-4xl font-black tracking-tighter text-f1-white mb-2">
          TERMS OF <span className="text-f1-red">SERVICE</span>
        </h1>
        <p className="text-f1-steel text-sm font-medium mb-12">
          LAST UPDATED: {lastUpdated.toUpperCase()}
        </p>
      </Reveal>

      <div className="space-y-16">
        {sections.map((section, index) => (
          <section key={index} className="group">
            <Reveal width="100%" delay={0.1 * index}>
              <div className="flex items-center gap-4 mb-4">
                <div className="h-px w-8 bg-f1-red scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                <h2 className="font-orbitron text-lg font-bold text-f1-white group-hover:text-white transition-colors">
                  {section.title}
                </h2>
              </div>
              <p className="text-f1-steel leading-relaxed text-base pl-12 border-l border-f1-graphite/30 group-hover:border-f1-red/30 transition-colors">
                {section.content}
              </p>
            </Reveal>
          </section>
        ))}
      </div>

      <Reveal width="100%" delay={0.6}>
        <div className="mt-20 p-8 rounded-xl border border-f1-graphite bg-f1-graphite/10 text-center">
          <p className="text-sm text-f1-steel mb-4">
            Questions regarding our technical terms?
          </p>
          <a
            href="mailto:legal@f1insight.com"
            className="font-orbitron text-xs font-bold tracking-widest text-f1-white hover:text-f1-red transition-colors"
          >
            CONTACT SYSTEMS LEGAL
          </a>
        </div>
      </Reveal>
    </div>
  );
}
