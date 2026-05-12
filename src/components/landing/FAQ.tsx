'use client'

import { useState } from 'react'

const faqs = [
  {
    question: 'How much does it cost?',
    answer:
      'Nothing upfront. We work on contingency, meaning we only get paid if you win. Our fee comes as a percentage of your settlement or verdict, so there is no financial risk to you.',
  },
  {
    question: 'How long will my case take?',
    answer:
      'Every case is different. Most personal injury cases resolve in 6 to 18 months. Cases that go to trial can take longer, but we work efficiently to get you the best outcome in the shortest time possible.',
  },
  {
    question: 'What if the accident was partially my fault?',
    answer:
      'California follows comparative negligence law. You may still recover compensation even if you were partially at fault for the accident. Your recovery is reduced by your percentage of fault, but you are not barred from recovery.',
  },
  {
    question: 'What should I do right after an accident?',
    answer:
      'Seek medical attention immediately, even if you feel fine. Document everything with photos. Do not give recorded statements to the other party\'s insurance company. Preserve any evidence. Then call us as soon as possible.',
  },
  {
    question: 'Do I really need a lawyer?',
    answer:
      'Insurance companies have entire teams of lawyers and adjusters whose job is to minimize your payout. You deserve someone equally qualified fighting for you. Studies consistently show that represented clients receive significantly higher settlements than unrepresented ones.',
  },
]

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group"
        aria-expanded={open}
      >
        <span className="font-sans font-semibold text-navy text-base group-hover:text-gold transition-colors duration-150">
          {question}
        </span>
        <span
          className={`flex-shrink-0 w-6 h-6 rounded-full border-2 border-gold flex items-center justify-center transition-transform duration-200 ${
            open ? 'rotate-45' : 'rotate-0'
          }`}
        >
          <svg
            className="w-3 h-3 text-gold"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </span>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          open ? 'max-h-[600px] opacity-100 pb-5' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="font-sans text-gray-500 leading-relaxed">{answer}</p>
      </div>
    </div>
  )
}

export default function FAQ() {
  return (
    <section className="bg-warm-gray py-24">
      <div className="max-w-3xl mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className="text-center mb-14">
          <p className="font-sans text-sm text-gold uppercase tracking-widest font-semibold mb-3">
            Got Questions?
          </p>
          <h2 className="font-serif text-4xl lg:text-5xl text-navy">Common Questions</h2>
          <div className="mt-5 mx-auto h-[3px] w-12 bg-gold rounded-full" />
        </div>

        <div className="bg-white rounded-2xl shadow-sm px-8 py-2">
          {faqs.map((faq) => (
            <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  )
}
