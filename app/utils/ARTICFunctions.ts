import { ARTICArtwork, ARTICConfig } from "../lib/definitions";

export function buildARTICImageUrl(iiif_url: string, image_id: string): string {
  return image_id ? `${iiif_url}/${image_id}/full/600,/0/default.jpg` : "";
}

export function mapARTICToMETData(data: ARTICArtwork, config: ARTICConfig) {
  const imageUrl = buildARTICImageUrl(config?.iiif_url || "", data.image_id);

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
    APIsource: "ARTIC",
  };
}
