import Button from "@/components/Button";
import { LinkIcon } from "@heroicons/react/outline";

export default function ContactForm() {
  return (
    <div className="font-serif h-4/5 w-4/5 px-10 flex flex-col justify-center relative">
      <div className="absolute w-72 aspect-square border-4 border-dashed rounded-full bottom-16 -right-28 border-neutral-300/10" />

      <h4 className="font-bold text-lg mb-8">Contact Details</h4>
      <form
        className="flex flex-col gap-6 z-20"
        onSubmit={(e) => {
          e.preventDefault(); // TODO send form
        }}
      >
        <input
          type="text"
          className="bg-transparent border-b-2 border-neutral-300 w-full focus:border-black duration-150 outline-none py-1"
          placeholder="Your Name"
        />
        <input
          type="text"
          className="bg-transparent border-b-2 border-neutral-300 w-full focus:border-black duration-150 outline-none py-1"
          placeholder="Your Email"
        />
        <textarea
          className="bg-transparent border-b-2 border-neutral-300 w-full focus:border-black duration-150 outline-none py-1 resize-none"
          placeholder="Your project details"
        />
        <label
          htmlFor="file-input"
          className="underline cursor-pointer flex gap-4 items-center"
        >
          <input type="file" id="file-input" className="hidden" />
          <span>
            <LinkIcon className="w-10 h-10 rounded-full bg-neutral-200/40 duration-100 p-2" />
          </span>
          Or attach your document here...
        </label>
        <div className="self-end">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
}
