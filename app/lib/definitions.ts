export type METReturnIDs = {
  total: number;
  objectIDs: number[];
};

export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  api: string;
  view?: "grid" | "list";
  pageLimit?: number;
  filters?: Filters;
};

export type APIObject = {
  objectID: number;
  isHighlight?: boolean;
  accessionNumber?: string;
  accessionYear?: string;
  isPublicDomain?: boolean;
  primaryImage: string;
  primaryImageSmall: string;
  additionalImages?: string[];
  constituents?: Constituent[];
  department?: string;
  objectName?: string;
  title: string;
  culture?: string;
  period?: string;
  dynasty?: string;
  reign?: string;
  portfolio?: string;
  artistRole?: string;
  artistPrefix?: string;
  artistDisplayName?: string;
  artistDisplayBio?: string;
  artistSuffix?: string;
  artistAlphaSort?: string;
  artistNationality?: string;
  artistBeginDate?: string;
  artistEndDate?: string;
  artistGender?: string;
  artistWikidata_URL?: string;
  artistULAN_URL?: string;
  objectDate?: string;
  objectBeginDate?: number;
  objectEndDate?: number;
  medium?: string;
  dimensions?: string;
  measurements?: Measurement[];
  creditLine?: string;
  geographyType?: string;
  city?: string;
  state?: string;
  county?: string;
  country?: string;
  region?: string;
  subregion?: string;
  locale?: string;
  locus?: string;
  excavation?: string;
  river?: string;
  classification?: string;
  rightsAndReproduction?: string;
  linkResource?: string;
  metadataDate?: string;
  repository?: string;
  objectURL?: string;
  tags?: Tags[];
  objectWikidata_URL?: string;
  isTimelineWork?: boolean;
  GalleryNumber?: string;
  APIsource: string;
  ARTICWidth?: number;
  ARTICHeight?: number;
  ARTICDescription?: string;
};

export type ARTICResponse = {
  pagination: ARTICPagination;
  data: ARTICArtwork[];
  config: ARTICConfig;
};

export type ARTICPagination = {
  total: number;
  limit: number;
  offset: number;
  total_pages: number;
  current_page: number;
  next_url: string | null;
};

export type ARTICConfig = {
  iiif_url: string;
};

export type ARTICArtwork = {
  id: number;
  api_model: string;
  api_link: string;
  is_boosted: boolean;
  title: string;
  alt_titles: string[] | null;
  thumbnail: {
    lqip: string;
    width: number;
    height: number;
    alt_text: string;
  } | null;
  main_reference_number: string;
  has_not_been_viewed_much: boolean;
  boost_rank: number | null;
  date_start: number;
  date_end: number;
  date_display: string;
  date_qualifier_title: string;
  date_qualifier_id: number | null;
  artist_display: string;
  place_of_origin: string;
  description: string | null;
  short_description: string | null;
  dimensions: string;
  dimensions_detail: DimensionDetail[];
  medium_display: string;
  inscriptions: string;
  credit_line: string;
  catalogue_display: string | null;
  publication_history: string | null;
  exhibition_history: string | null;
  provenance_text: string;
  edition: string | null;
  publishing_verification_level: string;
  internal_department_id: number;
  fiscal_year: number;
  fiscal_year_deaccession: number | null;
  is_public_domain: boolean;
  is_zoomable: boolean;
  max_zoom_window_size: number;
  copyright_notice: string | null;
  has_multimedia_resources: boolean;
  has_educational_resources: boolean;
  has_advanced_imaging: boolean;
  colorfulness: number;
  color: {
    h: number;
    l: number;
    s: number;
    percentage: number;
    population: number;
  };
  latitude: number | null;
  longitude: number | null;
  latlon: string | null;
  is_on_view: boolean;
  on_loan_display: string | null;
  gallery_title: string | null;
  gallery_id: number | null;
  nomisma_id: string | null;
  artwork_type_title: string;
  artwork_type_id: number;
  department_title: string;
  department_id: string;
  artist_id: number;
  artist_title: string;
  alt_artist_ids: number[];
  artist_ids: number[];
  artist_titles: string[];
  category_ids: string[];
  category_titles: string[];
  term_titles: string[];
  style_id: string;
  style_title: string;
  alt_style_ids: string[];
  style_ids: string[];
  style_titles: string[];
  classification_id: string;
  classification_title: string;
  alt_classification_ids: string[];
  classification_ids: string[];
  classification_titles: string[];
  subject_id: string | null;
  alt_subject_ids: string[];
  subject_ids: string[];
  subject_titles: string[];
  material_id: string | null;
  alt_material_ids: string[];
  material_ids: string[];
  material_titles: string[];
  technique_id: string | null;
  alt_technique_ids: string[];
  technique_ids: string[];
  technique_titles: string[];
  theme_titles: string[];
  image_id: string;
  alt_image_ids: string[];
  document_ids: string[];
  sound_ids: string[];
  video_ids: string[];
  text_ids: string[];
  section_ids: string[];
  section_titles: string[];
  site_ids: string[];
  suggest_autocomplete_all: SuggestAutocomplete[];
  source_updated_at: string;
  updated_at: string;
  timestamp: string;
  APIsource: string;
};

export type DimensionDetail = {
  depth: number | null;
  width: number;
  height: number;
  diameter: number | null;
  clarification: string | null;
};

export type SuggestAutocomplete = {
  input: string[];
  weight?: number;
  contexts: {
    groupings: string[];
  };
};

export type ArtworkIDResponse = {
  total: number;
  objectIDs: number[];
};

export type ARTICImageData = {
  data: ARTICArtwork;
  config: {
    iiif_url: string;
  };
};

export type Department = {
  departmentId: number;
  displayName: string;
};

export type APIDepartments = {
  departments: Department[];
};

export type Constituent = {
  constituentID?: number;
  role?: string;
  name?: string;
  constituentULAN_URL?: string;
  constituentWikidata_URL?: string;
  gender?: string;
};

export type Measurement = {
  elementName: string;
  elementDescription: string | null;
  elementMeasurements: {
    Height?: number;
    Width?: number;
    Length?: number;
    [key: string]: number | undefined;
  };
};

export type Tags = {
  term: string;
  AAT_URL?: string;
  Wikidata_URL?: string;
};

export type ArtworkPageProps = {
  artwork_id: string;
  apiSource: string;
  dashboard?: boolean;
  exhibit_id?: number;
  onRemove?: (objectID: number) => void;
  exhibits?: { exhibit_id: number; name: string; artworks: { id: string; date_added: Date }[] }[] | null;

};

export type ViewToggleProps = {
  view: "grid" | "list";
  setView: React.Dispatch<React.SetStateAction<"grid" | "list">>;
};

export type User = {
  user_id: number;
  username: string;
  name: string;
  exhibits: Exhibit[];
};

export type Filters = {
  q?: string;
  departmentId?: string;
  searchField?: string;
  hasImages?: string;
  dateBegin?: string;
  dateEnd?: string;
};

export type ARTICSearchResponse = {
  _score: number;
  id: number;
  api_model: string;
  api_link: string;
  is_boosted: boolean;
  title: string;
  thumbnail: {
    lqip: string;
    width: number;
    height: number;
    alt_text: string;
  };
  timestamp: string;
};

export type UserDetails = {
  name: string;
  username: string;
};

export type SmallItemCardProps = {
  art: APIObject;
  view?: "grid" | "list";
};

export type Exhibit = {
  exhibit_id: number;
  name: string;
  artworks: { id: string; date_added: Date }[];
};

export type CollectionArtworksProps = {
  artworks: APIObject[];
  pageNumber: number;
  totalPages: number;
  api: string;
  fetchedDepartments: Department[];
  totalResults: number;
};
