import Image from "next/image";
import Link from "next/link";
import { localePath, type Locale } from "@/config/site";
import { getDictionary } from "@/data/i18n";

export type GuideSetIdentityData = {
  set_id: string;
  set_number: string;
  name: string;
  slug: string;
  image_available: boolean;
};

export function GuideSetIdentity({ set, locale }: { set: GuideSetIdentityData; locale: Locale }) {
  const t = getDictionary(locale);
  const imagePath = set.image_available ? `/set-images/${set.set_id}.jpg` : null;

  return (
    <Link className="guide-set-link" href={localePath(locale, `/sets/${set.slug}`)}>
      <span className="guide-set-thumbnail">
        {imagePath
          ? <Image src={imagePath} alt={`${set.name} LEGO ${t.common.set} ${set.set_number}`} width={64} height={48} unoptimized sizes="64px" />
          : <span className="guide-set-placeholder">#{set.set_number}</span>}
      </span>
      <span className="guide-set-name"><strong>{set.name}</strong><small>#{set.set_number}</small></span>
    </Link>
  );
}
