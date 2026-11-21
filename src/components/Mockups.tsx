/* eslint-disable @next/next/no-img-element */

/** Khung điện thoại bằng CSS, chứa ảnh chụp màn hình thật của sản phẩm. */
export function PhoneFrame({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <div
      className={`relative mx-auto aspect-[9/18.6] w-[min(15.5rem,70vw)] overflow-hidden rounded-[2.4rem] border-[7px] border-[#101c2b] bg-white pt-5 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.55)] ${className}`}
    >
      <img src={src} alt={alt} className="h-full w-full object-cover object-top" />
      <span className="absolute left-1/2 top-1 h-3 w-14 -translate-x-1/2 rounded-full bg-[#101c2b]" aria-hidden="true" />
    </div>
  );
}

/** Khung máy tính xách tay bằng CSS. */
export function LaptopFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="mx-auto w-full max-w-[34rem]">
      <div className="overflow-hidden rounded-t-xl border-[6px] border-b-0 border-[#101c2b] bg-[#101c2b]">
        <img src={src} alt={alt} className="aspect-[1100/687] w-full object-cover object-top" loading="lazy" />
      </div>
      <div className="relative mx-[-3%] h-3 rounded-b-xl bg-gradient-to-b from-[#c9d3df] to-[#8e9bab]" aria-hidden="true">
        <span className="absolute left-1/2 top-0 h-1 w-16 -translate-x-1/2 rounded-b-md bg-[#6d7a8a]" />
      </div>
    </div>
  );
}
