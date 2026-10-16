
export default function AnimatedText({ text }) {
  return (
    <p className="mt-12 max-w-2xl leading-loose">
      {text.split('').map((char, index) => (
        <span
          key={`${char}${index}`}
          style={{ transitionDelay: `${10 * index}ms` }}
          className="inline-block starting:opacity-25 opacity-100 duration-750 transition-all text-white"
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </p>
  );
}
