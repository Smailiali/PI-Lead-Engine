const steps = [
  {
    number: '1',
    title: 'Tell Us What Happened',
    description:
      'Share your story through our simple form. It takes less than 2 minutes and there is no obligation.',
  },
  {
    number: '2',
    title: 'Free Case Review',
    description:
      'Our team reviews your case and our AI pre-screens it for a fast, accurate response within 24 hours.',
  },
  {
    number: '3',
    title: 'We Fight For You',
    description:
      'If you have a case, we handle everything from start to finish. You pay nothing unless we win.',
  },
]

export default function HowItWorks() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="font-sans text-sm text-gold uppercase tracking-widest font-semibold mb-3">
            Simple Process
          </p>
          <h2 className="font-serif text-4xl lg:text-5xl text-navy">
            How We Fight For You
          </h2>
          <div className="mt-5 mx-auto h-[3px] w-12 bg-gold rounded-full" />
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 relative">
          {/* Connecting line — desktop only */}
          <div className="hidden md:block absolute top-10 left-[calc(16.66%+1rem)] right-[calc(16.66%+1rem)] h-[2px] bg-gold/20" />

          {steps.map(({ number, title, description }) => (
            <div key={number} className="flex flex-col items-center text-center gap-5 relative">
              {/* Number circle */}
              <div className="relative z-10 w-20 h-20 rounded-full bg-navy flex items-center justify-center shadow-lg border-4 border-gold/20 flex-shrink-0">
                <span className="font-serif text-3xl text-gold">{number}</span>
              </div>

              <div className="flex flex-col gap-3">
                <h3 className="font-serif text-2xl text-navy">{title}</h3>
                <p className="font-sans text-gray-500 leading-relaxed max-w-xs mx-auto">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
