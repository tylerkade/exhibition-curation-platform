import { ARTICArtwork, ARTICConfig } from "../lib/definitions";

export function buildARTICImageUrl(
  iiif_url: string,
  image_id: string,
  width: number
): string {
  return image_id ? `${iiif_url}/${image_id}/full/${width},/0/default.jpg` : "";
}

export function mapARTICToMETData(data: ARTICArtwork, config: ARTICConfig) {
  const originalWidth = data.thumbnail?.width || 0;
  const originalHeight = data.thumbnail?.height || 0;
  const maxWidth = 843;

  let width = originalWidth;
  let height = originalHeight;

  if (originalWidth > maxWidth && originalHeight) {
    const aspectRatio = originalHeight / originalWidth;
    width = maxWidth;
    height = Math.round(maxWidth * aspectRatio);
  }

  const imageUrl = buildARTICImageUrl(
    config?.iiif_url || "",
    data.image_id,
    width || 600
  );
  const tags = data.term_titles.map((term) => ({ term }));

  return {
    objectID: data.id,
    title: data.title,
    artistDisplayName: data.artist_title,
    artistDisplayBio: data.artist_display,
    artistBeginDate: data.date_start?.toString() || "",
    artistEndDate: data.date_end?.toString() || "",
    department: data.department_title,
    culture: data.place_of_origin,
    medium: data.medium_display,
    dimensions: data.dimensions,
    objectDate: data.date_display,
    accessionNumber: data.main_reference_number,
    isPublicDomain: data.is_public_domain,
    objectName: data.artwork_type_title,
    primaryImage: imageUrl,
    primaryImageSmall: imageUrl,
    classification: data.classification_title,
    creditLine: data.credit_line,
    tags: tags,
    ARTICWidth: width,
    ARTICHeight: height,
    APIsource: "ARTIC",
    ARTICDescription: data.description || "",
  };
}

export function formatQ(q: string) {
  const splitQ = q
    .split(",")
    .map((i: string) => i.trim())
    .filter((i) => i.length > 0);
  if (splitQ.length === 0) return '""';

  const formatQ = splitQ
    .map((i: string) => (i.includes(" ") ? `"${i}"` : i))
    .join("+");
  return formatQ;
}
