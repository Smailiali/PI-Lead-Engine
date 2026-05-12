const stats = [
  { value: '$250M+', label: 'Recovered for Clients' },
  { value: '500+', label: 'Cases Won' },
  { value: '4.9★', label: 'Average Rating' },
  { value: '15+', label: 'Years of Experience' },
]

export default function SocialProofBar() {
  return (
    <section className="bg-[#07112a] border-y border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {stats.map(({ value, label }) => (
            <div
              key={label}
              className="flex flex-col items-center text-center gap-1 md:border-r md:border-white/10 last:border-0 px-4"
            >
              <span className="font-serif text-3xl lg:text-4xl text-gold">{value}</span>
              <span className="font-sans text-sm text-white/60 uppercase tracking-wider">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
