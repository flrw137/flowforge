import Image from "next/image";

type WordmarkProps = {
  /** Typography for the name — size, weight, case, tracking. */
  textClassName?: string;
  /** Logo box — height-driven, so the mark scales with the name. */
  logoClassName?: string;
  /** Above-the-fold marks should load eagerly (navbar). */
  priority?: boolean;
};

/**
 * FlowForge wordmark: logo + name, in one place so the navbar, the mobile
 * masthead, and the footer never drift apart.
 *
 * The name is set in Orbitron (`font-brand`) — the only text on the site that
 * uses it. The logo is decorative here: the name always follows it, so an empty
 * alt keeps screen readers from hearing the mark twice.
 */
export function Wordmark({
  textClassName = "text-h5 font-medium",
  logoClassName = "h-8 w-auto",
  priority = false,
}: WordmarkProps) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <Image
        src="/media/images/logoF.png"
        alt=""
        width={529}
        height={472}
        priority={priority}
        className={logoClassName}
      />
      <span className={`font-brand ${textClassName}`}>FlowForge</span>
    </span>
  );
}