import React, { useState } from "react";
import { FaChevronDown, FaAward, FaGem, FaUserShield, FaHeadset, FaMagic, FaArrowRight } from "react-icons/fa";
import Container from "../component/Container";
import Title from "../component/Title";

const About = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const stats = [
    { label: "Elite Members", value: "50K+" },
    { label: "Premium Assets", value: "1.2K+" },
    { label: "Security Score", value: "100%" },
    { label: "Response Time", value: "< 1hr" },
  ];

  const features = [
    { icon: <FaGem />, title: "Exquisite Curation", desc: "Every product is hand-picked for quality and peak performance." },
    { icon: <FaUserShield />, title: "Data Privacy", desc: "Your identity is protected by military-grade 256-bit encryption." },
    { icon: <FaMagic />, title: "Seamless Flow", desc: "Experience a checkout process as smooth as silk, tailored for you." },
    { icon: <FaHeadset />, title: "Concierge Support", desc: "Our dedicated experts are here to assist you at any moment." },
  ];

  const faqs = [
    { question: "What defines Digital Shop's exclusivity?", answer: "We don't just sell software; we provide curated digital solutions that are verified for authenticity and high performance." },
    { question: "How instant is the delivery?", answer: "The moment your payment is confirmed, the digital license is injected into your dashboard and sent to your encrypted email." },
    { question: "Are the licenses permanent?", answer: "Yes, most of our premium assets come with lifetime validity unless specified as a subscription-based service." },
    { question: "Is my payment information stored?", answer: "No. We utilize tokenized payment gateways, meaning your sensitive card details never touch our servers." },
  ];

  return (
    <div className="bg-white min-h-screen selection:bg-zinc-900 selection:text-white overflow-x-hidden">
      {/* Hero Section with Luxury Pulse */}
      <div className="bg-zinc-950 py-32 md:py-48 text-center text-white relative overflow-hidden">
        {/* Animated Background Gradients */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-zinc-800 rounded-full blur-[120px] opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-zinc-700 rounded-full blur-[150px] opacity-20 animate-pulse delay-700"></div>

        <div className="relative z-10 animate-fadeInUp">
          <Container>
            <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.8em] mb-6 opacity-0 animate-revealText">Established 2024</p>
            <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-8 leading-none">
               Beyond <br />
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-400 to-zinc-600 italic">Digital.</span>
            </h1>
            <p className="max-w-xl mx-auto text-zinc-400 text-lg font-light leading-relaxed opacity-80">
              Curating the world's most sophisticated digital assets for those who demand excellence.
            </p>
          </Container>
        </div>
      </div>

      <Container className="-mt-24 relative z-20">
        {/* Ultra-Premium Stats Card */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 bg-white/90 backdrop-blur-2xl p-12 rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border border-white/50 animate-fadeInUp delay-300">
          {stats.map((stat, i) => (
            <div key={i} className="text-center group border-zinc-100 md:border-r last:border-0 hover:scale-105 transition-transform duration-500">
              <p className="text-5xl font-black text-zinc-950 tracking-tighter mb-2">{stat.value}</p>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.3em]">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Brand Narrative with Parallax Effect */}
        <div className="py-32 grid md:grid-cols-2 gap-24 items-center">
          <div className="space-y-10 group">
            <div className="inline-block px-4 py-1 rounded-full border border-zinc-200 text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2">Our Philosophy</div>
            <Title className="text-5xl md:text-6xl font-black leading-[1.1] tracking-tight text-zinc-950">
              Redefining the <br/> Art of Digital.
            </Title>
            <p className="text-zinc-500 text-xl leading-relaxed font-light">
              Digital Shop is a sanctum for professionals. We believe that technology should be an extension of your ambition. We focus on the <span className="text-zinc-900 font-bold">craft</span>, so you can focus on the <span className="text-zinc-900 font-bold">creation</span>.
            </p>
            <button className="group relative flex items-center gap-4 bg-zinc-950 text-white px-10 py-5 rounded-full font-black text-[11px] uppercase tracking-[0.3em] hover:bg-zinc-800 transition-all duration-500 overflow-hidden">
               <span className="relative z-10">Experience the Craft</span>
               <FaArrowRight className="group-hover:translate-x-2 transition-transform duration-500" />
            </button>
          </div>

          <div className="relative group perspective-1000">
            <div className="absolute -inset-6 bg-zinc-100 rounded-[5rem] rotate-3 group-hover:rotate-0 transition-all duration-700"></div>
            <div className="relative h-[600px] rounded-[4rem] overflow-hidden shadow-2xl transition-all duration-700 group-hover:scale-[1.02] group-hover:-rotate-2">
              <img 
                src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80" 
                alt="Luxury Office" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100"
              />
            </div>
          </div>
        </div>

        {/* Feature Grid with Card Hover Animation */}
        <div className="pb-32 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, i) => (
            <div key={i} className="group p-12 rounded-[3.5rem] bg-zinc-50 border border-transparent hover:border-zinc-200 hover:bg-white hover:shadow-2xl transition-all duration-700 cursor-default">
              <div className="w-20 h-20 bg-white rounded-[2rem] flex items-center justify-center text-3xl mb-10 shadow-lg group-hover:bg-zinc-950 group-hover:text-white group-hover:rotate-[360deg] transition-all duration-1000">
                {item.icon}
              </div>
              <h3 className="text-2xl font-black text-zinc-950 mb-4">{item.title}</h3>
              <p className="text-zinc-500 leading-relaxed font-medium group-hover:text-zinc-800 transition-colors duration-500">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Elegant Minimalist FAQ */}
        <div className="max-w-4xl mx-auto pb-40">
          <div className="text-center mb-20 space-y-4">
            <span className="text-zinc-400 text-[11px] font-black uppercase tracking-[0.6em]">Assistance</span>
            <Title className="text-5xl font-black">Frequent Inquiries</Title>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-zinc-100 rounded-[2.5rem] bg-zinc-50/50 overflow-hidden transition-all duration-500 hover:border-zinc-300">
                <button
                  className="w-full flex justify-between items-center p-8 text-left transition-all duration-500"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <span className={`text-xl font-bold tracking-tight transition-colors duration-500 ${openIndex === index ? 'text-zinc-950' : 'text-zinc-500'}`}>
                    {faq.question}
                  </span>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border border-zinc-200 transition-all duration-500 ${openIndex === index ? 'rotate-180 bg-zinc-950 text-white border-zinc-950' : 'text-zinc-400'}`}>
                    <FaChevronDown size={14} />
                  </div>
                </button>
                <div className={`transition-all duration-700 ease-in-out px-8 overflow-hidden ${openIndex === index ? 'max-h-96 opacity-100 pb-8' : 'max-h-0 opacity-0'}`}>
                  <p className="text-zinc-500 text-lg font-light leading-relaxed border-t border-zinc-200/50 pt-6">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default About;