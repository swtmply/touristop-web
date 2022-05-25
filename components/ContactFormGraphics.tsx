export default function ContactFormGraphics() {
  return (
    <div className="bg-neutral-900 h-4/5 w-[70%] justify-self-end pt-16 px-10 relative">
      <div className="absolute w-32 aspect-square rounded-full top-5 left-5 bg-neutral-300/10" />
      <div className="absolute border-t-[3px] border-r-[3px] border-dashed h-40 aspect-square top-60 right-5 border-neutral-300/40" />
      <div className="absolute w-64 aspect-square border-2 rounded-full top-32 -right-28 border-neutral-300/10" />
      <div className="absolute w-64 aspect-square border-4 rounded-full -bottom-32 -left-32 border-dashed border-neutral-300/30" />
      <h3 className="font-serif font-bold text-4xl text-white">
        Make your project come to life.
      </h3>
    </div>
  );
}
