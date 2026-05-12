const testimonials = [
  {
    quote:
      'After my car accident, I didn\'t know what to do or where to turn. They handled absolutely everything and got me $1.2 million. I can\'t thank them enough.',
    name: 'Maria R.',
    caseType: 'Car Accident',
    settlement: '$1.2M Settlement',
    rating: 5,
  },
  {
    quote:
      'A commercial truck ran a red light and destroyed my car. I thought I\'d be fighting alone against a big corporation. This firm leveled the playing field and won.',
    name: 'James T.',
    caseType: 'Truck Accident',
    settlement: '$875K Settlement',
    rating: 5,
  },
  {
    quote:
      'I slipped at a grocery store and broke my hip. They got me a settlement that covered all my medical bills, lost wages, and more. Truly life-changing.',
    name: 'Sandra M.',
    caseType: 'Slip & Fall',
    settlement: '$320K Settlement',
    rating: 5,
  },
]

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-gold fill-gold" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="font-sans text-sm text-gold uppercase tracking-widest font-semibold mb-3">
            Client Stories
          </p>
          <h2 className="font-serif text-4xl lg:text-5xl text-navy">What Our Clients Say</h2>
          <div className="mt-5 mx-auto h-[3px] w-12 bg-gold rounded-full" />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map(({ quote, name, caseType, settlement, rating }) => (
            <div
              key={name}
              className="relative bg-white rounded-xl p-8 flex flex-col gap-5 shadow-sm border border-gray-100 border-l-4 border-l-gold"
            >
              <StarRating count={rating} />

              <blockquote className="font-sans text-gray-600 leading-relaxed italic flex-1">
                &ldquo;{quote}&rdquo;
              </blockquote>

              <div className="pt-4 border-t border-gray-100 flex flex-col gap-1">
                <p className="font-sans font-semibold text-navy text-sm">{name}</p>
                <p className="font-sans text-xs text-gray-400">{caseType}</p>
                <p className="font-serif text-lg text-gold mt-1">{settlement}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
