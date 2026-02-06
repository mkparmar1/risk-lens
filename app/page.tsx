"use client"

import Link from "next/link"
import { ArrowRight, ShieldCheck, Zap, FileText, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { CursorFollower } from "@/components/ui/CursorFollower"
import { WaterRippleEffect } from "@/components/ui/WaterRippleEffect"

const textVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 }
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background selection:bg-primary/20 relative">
      <WaterRippleEffect />
      <CursorFollower />
      <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-background/60 backdrop-blur-xl supports-[backdrop-filter]:bg-background/30">
        <div className="container mx-auto px-4 md:px-6 flex h-16 items-center justify-between">
          <Link className="flex items-center space-x-2" href="/">
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">RiskLens</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <Link href="/community" className="hover:text-primary transition-colors">Community</Link>
            <Link href="#features" className="hover:text-primary transition-colors">Features</Link>
            <Link href="#how-it-works" className="hover:text-primary transition-colors">How it Works</Link>
            <Link href="/login" className="hover:text-primary transition-colors">Login</Link>
            <Link href="/analyze">
              <Button size="sm" className="rounded-full px-6">Launch App</Button>
            </Link>
          </nav>
          <div className="md:hidden">
            <Button size="sm" variant="ghost">Menu</Button>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full overflow-hidden">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center pt-20">
          {/* Animated Background Blobs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-3xl animate-blob mix-blend-screen" />
            <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-indigo-500/20 rounded-full blur-3xl animate-blob animation-delay-2000 mix-blend-screen" />
            <div className="absolute -bottom-32 left-1/3 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-3xl animate-blob animation-delay-4000 mix-blend-screen" />
          </div>

          <div className="container relative z-10 px-4 md:px-6 flex flex-col items-center text-center gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block py-1 px-3 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
                AI-Powered Freelance Protection
              </span>
              <motion.h1
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
              >
                {/* Line 1 */}
                <span className="block text-water">
                  {["Stop", "Guessing."].map((word, i) => (
                    <motion.span key={i} variants={textVariant} className="inline-block mr-4">{word}</motion.span>
                  ))}
                </span>
                {/* Line 2 */}
                <span className="block text-water">
                  {["Start", "Knowing."].map((word, i) => (
                    <motion.span key={i} variants={textVariant} className="inline-block mr-4">{word}</motion.span>
                  ))}
                </span>
              </motion.h1>
              <p className="max-w-[42rem] mx-auto text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
                Analyze client requirements, detect red flags, and negotiate with confidence using our advanced AI risk assessment engine.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/analyze">
                  <Button size="lg" className="h-14 px-8 rounded-full text-lg shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] transition-all bg-primary hover:bg-primary/90 text-white border-0">
                    Analyze Project <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="#features">
                  <Button variant="outline" size="lg" className="h-14 px-8 rounded-full text-lg border-white/10 hover:bg-white/5 hover:text-white bg-transparent backdrop-blur-sm">
                    Explore Features
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Dashboard Preview / Mockup */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-16 relative w-full max-w-5xl rounded-xl border border-white/10 bg-black/40 backdrop-blur-md shadow-2xl overflow-hidden aspect-video group"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/5">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
                <div className="flex-1 text-center text-xs text-muted-foreground font-mono">risklens_dashboard_v2.0</div>
              </div>
              <div className="p-8 flex items-center justify-center h-full">
                <p className="text-muted-foreground">Interactive Analysis Dashboard Preview</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="py-24 md:py-32 relative">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Everything needed for safe contracts</h2>
              <p className="text-muted-foreground text-lg">Comprehensive tools to identify bad actors and secure fair terms.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  icon: ShieldCheck,
                  title: "Risk Scoring Engine",
                  desc: "Get a 0-100 probability score based on scope creep, budget adequacy, and timeline realism.",
                  gradient: "from-blue-500/20 to-cyan-500/20"
                },
                {
                  icon: Zap,
                  title: "Smart Recommendations",
                  desc: "Actionable advice: Accept, Negotiate, or Reject. Plus specific questions to ask the client.",
                  gradient: "from-purple-500/20 to-pink-500/20"
                },
                {
                  icon: FileText,
                  title: "Report Generation",
                  desc: "Create professional PDF reports detailing the risk analysis for your project records.",
                  gradient: "from-orange-500/20 to-red-500/20"
                }
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -5 }}
                  className="relative group p-8 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/5 -skew-y-3 transform origin-top-right scale-110" />
          <div className="container relative z-10 px-4 md:px-6 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <span className="text-primary font-semibold tracking-wider uppercase text-sm">Process</span>
              <h2 className="text-3xl md:text-5xl font-bold mt-2 mb-4">From Doubt to Deal in Seconds</h2>
              <p className="text-muted-foreground text-lg">Simple 3-step process to secure your freelance future.</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-12 relative">
              {/* Connector Line */}
              <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent dashed-line" />

              {[
                {
                  step: "01",
                  title: "Input Details",
                  desc: "Paste the project description, budget, and timeline from the job post or email."
                },
                {
                  step: "02",
                  title: "AI Analysis",
                  desc: "Our engine scans for 50+ risk patterns, inconsistency signals, and budget pitfalls."
                },
                {
                  step: "03",
                  title: "Get Protection",
                  desc: "Receive a risk score, negotiation strategy, and AI-generated legal clauses."
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.2 }}
                  className="relative flex flex-col items-center text-center group"
                >
                  <div className="w-24 h-24 rounded-full bg-background border-4 border-muted group-hover:border-primary transition-colors flex items-center justify-center text-3xl font-bold text-muted-foreground group-hover:text-primary mb-6 z-10 shadow-xl">
                    {item.step}
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed max-w-xs">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why It Matters Section */}
        <section className="py-24 bg-white/5 border-y border-white/10">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-5xl font-bold mb-6">Freedom shouldn't cost you your peace of mind</h2>
                <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                  71% of freelancers have faced non-payment or severe scope creep. RiskLens acts as your 24/7 legal & sales consultant, pointing out the traps before you sign the contract.
                </p>
                <ul className="space-y-4">
                  {[
                    "Spot 'Scope Creep' phrases hidden in descriptions",
                    "Validate if the budget matches the workload",
                    "Identify clients who treat you like an employee",
                    "Get specific questions to clarify ambiguous terms"
                  ].map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-6 h-6 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center">
                        <CheckCircle className="w-4 h-4" />
                      </div>
                      <span className="text-lg">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-purple-500/20 blur-3xl rounded-full" />
                <div className="relative bg-black/60 border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center shrink-0">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-1">Common Red Flag Detected</h4>
                        <p className="text-muted-foreground text-sm">"We need this done ASAP and can offer equity."</p>
                        <div className="mt-2 text-red-400 text-sm font-medium">Risk: High - Unstable Payment</div>
                      </div>
                    </div>
                    <div className="h-px bg-white/10" />
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-yellow-500/20 text-yellow-500 flex items-center justify-center shrink-0">
                        <Zap className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-1">Timeline Warning</h4>
                        <p className="text-muted-foreground text-sm">"Simple app, like Uber but for dogs."</p>
                        <div className="mt-2 text-yellow-400 text-sm font-medium">Risk: Medium - Unrealistic Scope</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24">
          <div className="container px-4 md:px-6 mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
            </motion.div>

            <div className="grid gap-6">
              {[
                {
                  q: "Is RiskLens free to use?",
                  a: "Yes! You get 5 free analysis credits to start. After that, you can purchase credit packs or subscribe for unlimited access."
                },
                {
                  q: "Does it work for Upwork/Fiverr jobs?",
                  a: "Absolutely. Just copy and paste the job description text into our analyzer. It works for direct client emails too."
                },
                {
                  q: "Can I use the generated contracts?",
                  a: "The contract clauses are AI-generated suggestions based on common legal standards. While highly protective, we always recommend reviewing them with a legal professional for major deals."
                },
                {
                  q: "How accurate is the risk score?",
                  a: "Our model is trained on thousands of successful and failed freelance projects. It identifies patterns that usually lead to issues, giving you a probability-based assessment."
                }
              ].map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors"
                >
                  <h3 className="text-xl font-bold mb-2 text-primary/90">{faq.q}</h3>
                  <p className="text-muted-foreground">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 border-t border-white/10">
          <div className="container px-4 md:px-6 mx-auto text-center">
            <div className="max-w-3xl mx-auto space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Ready to analyze your next gig?</h2>
              <p className="text-xl text-muted-foreground">Join thousands of freelancers who use RiskLens to avoid project pitfalls.</p>
              <Link href="/analyze">
                <Button size="lg" className="h-16 px-10 rounded-full text-xl shadow-2xl shadow-primary/20 bg-primary hover:bg-primary/90 text-white">
                  Start Free Analysis
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 py-12 bg-black/20">
        <div className="container px-4 mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <span className="font-bold text-lg">RiskLens</span>
          <p className="text-sm text-muted-foreground">© 2024 RiskLens. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
