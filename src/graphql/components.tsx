/* tslint:disable */
import { GraphQLResolveInfo } from 'graphql';

export type Resolver<Result, Parent = any, Context = any, Args = any> = (
  parent: Parent,
  args: Args,
  context: Context,
  info: GraphQLResolveInfo,
) => Promise<Result> | Result;

export type SubscriptionResolver<
  Result,
  Parent = any,
  Context = any,
  Args = any
> = {
  subscribe<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: Context,
    info: GraphQLResolveInfo,
  ): AsyncIterator<R | Result>;
  resolve?<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: Context,
    info: GraphQLResolveInfo,
  ): R | Result | Promise<R | Result>;
};

export type DateTime = any;

export type LocalDate = any;

/** The `Upload` scalar type represents a file upload promise that resolves an object containing `stream`, `filename`, `mimetype` and `encoding`. */
export type Upload = any;

/** The `Long` scalar type represents non-fractional signed whole numeric values.Long can represent values between -(2^63) and 2^63 - 1. */
export type Long = any;
/** An object with an ID */
export interface Node {
  id: string /** The id of the object. */;
}

export interface Query {
  languages: Language[];
  insurance: Insurance;
  cashback: Cashback;
  signStatus: SignStatus;
  member: Member;
  gifs: Gif[];
  file: File;
}

export interface Language extends Node {
  status: Status;
  id: string;
  createdAt: DateTime;
  updatedAt: DateTime;
  translations?: Translation[] | null;
  code: string;
  name: string;
}

export interface Translation extends Node {
  status: Status;
  id: string;
  createdAt: DateTime;
  updatedAt: DateTime;
  language?: Language | null;
  project?: Project | null;
  key?: Key | null;
  text: string;
}

export interface Key extends Node {
  status: Status;
  id: string;
  createdAt: DateTime;
  updatedAt: DateTime;
  value: string;
  translations?: Translation[] | null;
  perilCategoryTitle?: PerilCategory | null;
  perilCategoryDescription?: PerilCategory | null;
  perilTitle?: Peril | null;
  perilDescription?: Peril | null;
}

export interface PerilCategory {
  title?: string | null;
  description?: string | null;
  iconUrl?: string | null;
  perils?: Peril[] | null;
}

export interface Peril {
  id?: string | null;
  title?: string | null;
  imageUrl?: string | null;
  description?: string | null;
}

export interface Insurance {
  address?: string | null;
  postalNumber?: string | null;
  monthlyCost?: number | null;
  safetyIncreasers?: string[] | null;
  personsInHousehold?: number | null;
  certificateUrl?: string | null;
  status: InsuranceStatus;
  type?: InsuranceType | null;
  activeFrom?: LocalDate | null;
  insuredAtOtherCompany?: boolean | null;
  presaleInformationUrl?: string | null;
  policyUrl?: string | null;
  currentInsurerName?: string | null;
  perilCategories?: PerilCategory[] | null;
}

export interface Cashback {
  id?: string | null;
  name?: string | null;
  imageUrl?: string | null;
}

export interface SignStatus {
  collectStatus?: CollectStatus | null;
  signState?: SignState | null;
}

export interface CollectStatus {
  status?: BankIdStatus | null;
  code?: string | null;
}

export interface Member {
  firstName?: string | null;
  lastName?: string | null;
}

export interface Gif {
  url?: string | null;
}

export interface File {
  signedUrl: string /** signedUrl is valid for 30 minutes after upload, don't hang on to this. */;
  key: string /** S3 key that can be used to retreive new signed urls in the future. */;
}

export interface Mutation {
  logout: boolean;
  createSession: string;
  createOffer?: boolean | null;
  signOffer?: boolean | null;
  uploadFile: File;
}

export interface Subscription {
  offer?: OfferEvent | null;
  signStatus?: SignEvent | null;
}

export interface OfferEvent {
  status: OfferStatus;
  insurance?: Insurance | null;
}

export interface SignEvent {
  status?: SignStatus | null;
}

export interface Asset extends Node {
  status: Status;
  id: string;
  createdAt: DateTime;
  updatedAt: DateTime;
  handle: string;
  fileName: string;
  height?: number | null;
  mimeType?: string | null;
  size?: number | null;
  width?: number | null;
  url: string /** Get the url for the asset with provided transformations applied. */;
}

export interface Color extends Node {
  id: string;
  createdAt: DateTime;
  updatedAt: DateTime;
}

export interface Location extends Node {
  id: string;
  createdAt: DateTime;
  updatedAt: DateTime;
}
/** A connection to a list of items. */
export interface AssetConnection {
  pageInfo: PageInfo /** Information to aid in pagination. */;
  edges: AssetEdge[] /** A list of edges. */;
  aggregate: AggregateAsset;
}
/** Information about pagination in a connection. */
export interface PageInfo {
  hasNextPage: boolean /** When paginating forwards, are there more items? */;
  hasPreviousPage: boolean /** When paginating backwards, are there more items? */;
  startCursor?:
    | string
    | null /** When paginating backwards, the cursor to continue. */;
  endCursor?:
    | string
    | null /** When paginating forwards, the cursor to continue. */;
}
/** An edge in a connection. */
export interface AssetEdge {
  node: Asset /** The item at the end of the edge. */;
  cursor: string /** A cursor for use in pagination. */;
}

export interface AggregateAsset {
  count: number;
}
/** A connection to a list of items. */
export interface ColorConnection {
  pageInfo: PageInfo /** Information to aid in pagination. */;
  edges: ColorEdge[] /** A list of edges. */;
  aggregate: AggregateColor;
}
/** An edge in a connection. */
export interface ColorEdge {
  node: Color /** The item at the end of the edge. */;
  cursor: string /** A cursor for use in pagination. */;
}

export interface AggregateColor {
  count: number;
}
/** A connection to a list of items. */
export interface LocationConnection {
  pageInfo: PageInfo /** Information to aid in pagination. */;
  edges: LocationEdge[] /** A list of edges. */;
  aggregate: AggregateLocation;
}
/** An edge in a connection. */
export interface LocationEdge {
  node: Location /** The item at the end of the edge. */;
  cursor: string /** A cursor for use in pagination. */;
}

export interface AggregateLocation {
  count: number;
}
/** A connection to a list of items. */
export interface LanguageConnection {
  pageInfo: PageInfo /** Information to aid in pagination. */;
  edges: LanguageEdge[] /** A list of edges. */;
  aggregate: AggregateLanguage;
}
/** An edge in a connection. */
export interface LanguageEdge {
  node: Language /** The item at the end of the edge. */;
  cursor: string /** A cursor for use in pagination. */;
}

export interface AggregateLanguage {
  count: number;
}
/** A connection to a list of items. */
export interface KeyConnection {
  pageInfo: PageInfo /** Information to aid in pagination. */;
  edges: KeyEdge[] /** A list of edges. */;
  aggregate: AggregateKey;
}
/** An edge in a connection. */
export interface KeyEdge {
  node: Key /** The item at the end of the edge. */;
  cursor: string /** A cursor for use in pagination. */;
}

export interface AggregateKey {
  count: number;
}
/** A connection to a list of items. */
export interface TranslationConnection {
  pageInfo: PageInfo /** Information to aid in pagination. */;
  edges: TranslationEdge[] /** A list of edges. */;
  aggregate: AggregateTranslation;
}
/** An edge in a connection. */
export interface TranslationEdge {
  node: Translation /** The item at the end of the edge. */;
  cursor: string /** A cursor for use in pagination. */;
}

export interface AggregateTranslation {
  count: number;
}
/** A connection to a list of items. */
export interface PerilConnection {
  pageInfo: PageInfo /** Information to aid in pagination. */;
  edges: PerilEdge[] /** A list of edges. */;
  aggregate: AggregatePeril;
}
/** An edge in a connection. */
export interface PerilEdge {
  node: Peril /** The item at the end of the edge. */;
  cursor: string /** A cursor for use in pagination. */;
}

export interface AggregatePeril {
  count: number;
}
/** A connection to a list of items. */
export interface PerilCategoryConnection {
  pageInfo: PageInfo /** Information to aid in pagination. */;
  edges: PerilCategoryEdge[] /** A list of edges. */;
  aggregate: AggregatePerilCategory;
}
/** An edge in a connection. */
export interface PerilCategoryEdge {
  node: PerilCategory /** The item at the end of the edge. */;
  cursor: string /** A cursor for use in pagination. */;
}

export interface AggregatePerilCategory {
  count: number;
}

export interface BatchPayload {
  count: Long /** The number of nodes that have been affected by the Batch operation. */;
}

export interface AssetSubscriptionPayload {
  mutation: MutationType;
  node?: Asset | null;
  updatedFields?: string[] | null;
  previousValues?: AssetPreviousValues | null;
}

export interface AssetPreviousValues {
  status: Status;
  id: string;
  createdAt: DateTime;
  updatedAt: DateTime;
  handle: string;
  fileName: string;
  height?: number | null;
  mimeType?: string | null;
  size?: number | null;
  width?: number | null;
}

export interface ColorSubscriptionPayload {
  mutation: MutationType;
  node?: Color | null;
  updatedFields?: string[] | null;
  previousValues?: ColorPreviousValues | null;
}

export interface ColorPreviousValues {
  id: string;
  createdAt: DateTime;
  updatedAt: DateTime;
}

export interface LocationSubscriptionPayload {
  mutation: MutationType;
  node?: Location | null;
  updatedFields?: string[] | null;
  previousValues?: LocationPreviousValues | null;
}

export interface LocationPreviousValues {
  id: string;
  createdAt: DateTime;
  updatedAt: DateTime;
}

export interface LanguageSubscriptionPayload {
  mutation: MutationType;
  node?: Language | null;
  updatedFields?: string[] | null;
  previousValues?: LanguagePreviousValues | null;
}

export interface LanguagePreviousValues {
  status: Status;
  id: string;
  createdAt: DateTime;
  updatedAt: DateTime;
  code: string;
  name: string;
}

export interface KeySubscriptionPayload {
  mutation: MutationType;
  node?: Key | null;
  updatedFields?: string[] | null;
  previousValues?: KeyPreviousValues | null;
}

export interface KeyPreviousValues {
  status: Status;
  id: string;
  createdAt: DateTime;
  updatedAt: DateTime;
  value: string;
}

export interface TranslationSubscriptionPayload {
  mutation: MutationType;
  node?: Translation | null;
  updatedFields?: string[] | null;
  previousValues?: TranslationPreviousValues | null;
}

export interface TranslationPreviousValues {
  status: Status;
  id: string;
  createdAt: DateTime;
  updatedAt: DateTime;
  project?: Project | null;
  text: string;
}

export interface PerilSubscriptionPayload {
  mutation: MutationType;
  node?: Peril | null;
  updatedFields?: string[] | null;
  previousValues?: PerilPreviousValues | null;
}

export interface PerilPreviousValues {
  status: Status;
  id: string;
  createdAt: DateTime;
  updatedAt: DateTime;
}

export interface PerilCategorySubscriptionPayload {
  mutation: MutationType;
  node?: PerilCategory | null;
  updatedFields?: string[] | null;
  previousValues?: PerilCategoryPreviousValues | null;
}

export interface PerilCategoryPreviousValues {
  status: Status;
  id: string;
  createdAt: DateTime;
  updatedAt: DateTime;
  name: string;
}

export interface LanguageWhereInput {
  AND?: LanguageWhereInput[] | null /** Logical AND on all given filters. */;
  OR?: LanguageWhereInput[] | null /** Logical OR on all given filters. */;
  NOT?:
    | LanguageWhereInput[]
    | null /** Logical NOT on all given filters combined by AND. */;
  status?: Status | null;
  status_not?: Status | null /** All values that are not equal to given value. */;
  status_in?:
    | Status[]
    | null /** All values that are contained in given list. */;
  status_not_in?:
    | Status[]
    | null /** All values that are not contained in given list. */;
  id?: string | null;
  id_not?: string | null /** All values that are not equal to given value. */;
  id_in?: string[] | null /** All values that are contained in given list. */;
  id_not_in?:
    | string[]
    | null /** All values that are not contained in given list. */;
  id_lt?: string | null /** All values less than the given value. */;
  id_lte?: string | null /** All values less than or equal the given value. */;
  id_gt?: string | null /** All values greater than the given value. */;
  id_gte?:
    | string
    | null /** All values greater than or equal the given value. */;
  id_contains?: string | null /** All values containing the given string. */;
  id_not_contains?:
    | string
    | null /** All values not containing the given string. */;
  id_starts_with?:
    | string
    | null /** All values starting with the given string. */;
  id_not_starts_with?:
    | string
    | null /** All values not starting with the given string. */;
  id_ends_with?: string | null /** All values ending with the given string. */;
  id_not_ends_with?:
    | string
    | null /** All values not ending with the given string. */;
  createdAt?: DateTime | null;
  createdAt_not?: DateTime | null /** All values that are not equal to given value. */;
  createdAt_in?:
    | DateTime[]
    | null /** All values that are contained in given list. */;
  createdAt_not_in?:
    | DateTime[]
    | null /** All values that are not contained in given list. */;
  createdAt_lt?: DateTime | null /** All values less than the given value. */;
  createdAt_lte?: DateTime | null /** All values less than or equal the given value. */;
  createdAt_gt?: DateTime | null /** All values greater than the given value. */;
  createdAt_gte?: DateTime | null /** All values greater than or equal the given value. */;
  updatedAt?: DateTime | null;
  updatedAt_not?: DateTime | null /** All values that are not equal to given value. */;
  updatedAt_in?:
    | DateTime[]
    | null /** All values that are contained in given list. */;
  updatedAt_not_in?:
    | DateTime[]
    | null /** All values that are not contained in given list. */;
  updatedAt_lt?: DateTime | null /** All values less than the given value. */;
  updatedAt_lte?: DateTime | null /** All values less than or equal the given value. */;
  updatedAt_gt?: DateTime | null /** All values greater than the given value. */;
  updatedAt_gte?: DateTime | null /** All values greater than or equal the given value. */;
  code?: string | null;
  code_not?: string | null /** All values that are not equal to given value. */;
  code_in?: string[] | null /** All values that are contained in given list. */;
  code_not_in?:
    | string[]
    | null /** All values that are not contained in given list. */;
  code_lt?: string | null /** All values less than the given value. */;
  code_lte?:
    | string
    | null /** All values less than or equal the given value. */;
  code_gt?: string | null /** All values greater than the given value. */;
  code_gte?:
    | string
    | null /** All values greater than or equal the given value. */;
  code_contains?: string | null /** All values containing the given string. */;
  code_not_contains?:
    | string
    | null /** All values not containing the given string. */;
  code_starts_with?:
    | string
    | null /** All values starting with the given string. */;
  code_not_starts_with?:
    | string
    | null /** All values not starting with the given string. */;
  code_ends_with?:
    | string
    | null /** All values ending with the given string. */;
  code_not_ends_with?:
    | string
    | null /** All values not ending with the given string. */;
  name?: string | null;
  name_not?: string | null /** All values that are not equal to given value. */;
  name_in?: string[] | null /** All values that are contained in given list. */;
  name_not_in?:
    | string[]
    | null /** All values that are not contained in given list. */;
  name_lt?: string | null /** All values less than the given value. */;
  name_lte?:
    | string
    | null /** All values less than or equal the given value. */;
  name_gt?: string | null /** All values greater than the given value. */;
  name_gte?:
    | string
    | null /** All values greater than or equal the given value. */;
  name_contains?: string | null /** All values containing the given string. */;
  name_not_contains?:
    | string
    | null /** All values not containing the given string. */;
  name_starts_with?:
    | string
    | null /** All values starting with the given string. */;
  name_not_starts_with?:
    | string
    | null /** All values not starting with the given string. */;
  name_ends_with?:
    | string
    | null /** All values ending with the given string. */;
  name_not_ends_with?:
    | string
    | null /** All values not ending with the given string. */;
  translations_every?: TranslationWhereInput | null;
  translations_some?: TranslationWhereInput | null;
  translations_none?: TranslationWhereInput | null;
}

export interface TranslationWhereInput {
  AND?: TranslationWhereInput[] | null /** Logical AND on all given filters. */;
  OR?: TranslationWhereInput[] | null /** Logical OR on all given filters. */;
  NOT?:
    | TranslationWhereInput[]
    | null /** Logical NOT on all given filters combined by AND. */;
  status?: Status | null;
  status_not?: Status | null /** All values that are not equal to given value. */;
  status_in?:
    | Status[]
    | null /** All values that are contained in given list. */;
  status_not_in?:
    | Status[]
    | null /** All values that are not contained in given list. */;
  id?: string | null;
  id_not?: string | null /** All values that are not equal to given value. */;
  id_in?: string[] | null /** All values that are contained in given list. */;
  id_not_in?:
    | string[]
    | null /** All values that are not contained in given list. */;
  id_lt?: string | null /** All values less than the given value. */;
  id_lte?: string | null /** All values less than or equal the given value. */;
  id_gt?: string | null /** All values greater than the given value. */;
  id_gte?:
    | string
    | null /** All values greater than or equal the given value. */;
  id_contains?: string | null /** All values containing the given string. */;
  id_not_contains?:
    | string
    | null /** All values not containing the given string. */;
  id_starts_with?:
    | string
    | null /** All values starting with the given string. */;
  id_not_starts_with?:
    | string
    | null /** All values not starting with the given string. */;
  id_ends_with?: string | null /** All values ending with the given string. */;
  id_not_ends_with?:
    | string
    | null /** All values not ending with the given string. */;
  createdAt?: DateTime | null;
  createdAt_not?: DateTime | null /** All values that are not equal to given value. */;
  createdAt_in?:
    | DateTime[]
    | null /** All values that are contained in given list. */;
  createdAt_not_in?:
    | DateTime[]
    | null /** All values that are not contained in given list. */;
  createdAt_lt?: DateTime | null /** All values less than the given value. */;
  createdAt_lte?: DateTime | null /** All values less than or equal the given value. */;
  createdAt_gt?: DateTime | null /** All values greater than the given value. */;
  createdAt_gte?: DateTime | null /** All values greater than or equal the given value. */;
  updatedAt?: DateTime | null;
  updatedAt_not?: DateTime | null /** All values that are not equal to given value. */;
  updatedAt_in?:
    | DateTime[]
    | null /** All values that are contained in given list. */;
  updatedAt_not_in?:
    | DateTime[]
    | null /** All values that are not contained in given list. */;
  updatedAt_lt?: DateTime | null /** All values less than the given value. */;
  updatedAt_lte?: DateTime | null /** All values less than or equal the given value. */;
  updatedAt_gt?: DateTime | null /** All values greater than the given value. */;
  updatedAt_gte?: DateTime | null /** All values greater than or equal the given value. */;
  project?: Project | null;
  project_not?: Project | null /** All values that are not equal to given value. */;
  project_in?:
    | Project[]
    | null /** All values that are contained in given list. */;
  project_not_in?:
    | Project[]
    | null /** All values that are not contained in given list. */;
  text?: string | null;
  text_not?: string | null /** All values that are not equal to given value. */;
  text_in?: string[] | null /** All values that are contained in given list. */;
  text_not_in?:
    | string[]
    | null /** All values that are not contained in given list. */;
  text_lt?: string | null /** All values less than the given value. */;
  text_lte?:
    | string
    | null /** All values less than or equal the given value. */;
  text_gt?: string | null /** All values greater than the given value. */;
  text_gte?:
    | string
    | null /** All values greater than or equal the given value. */;
  text_contains?: string | null /** All values containing the given string. */;
  text_not_contains?:
    | string
    | null /** All values not containing the given string. */;
  text_starts_with?:
    | string
    | null /** All values starting with the given string. */;
  text_not_starts_with?:
    | string
    | null /** All values not starting with the given string. */;
  text_ends_with?:
    | string
    | null /** All values ending with the given string. */;
  text_not_ends_with?:
    | string
    | null /** All values not ending with the given string. */;
  language?: LanguageWhereInput | null;
  key?: KeyWhereInput | null;
}

export interface KeyWhereInput {
  AND?: KeyWhereInput[] | null /** Logical AND on all given filters. */;
  OR?: KeyWhereInput[] | null /** Logical OR on all given filters. */;
  NOT?:
    | KeyWhereInput[]
    | null /** Logical NOT on all given filters combined by AND. */;
  status?: Status | null;
  status_not?: Status | null /** All values that are not equal to given value. */;
  status_in?:
    | Status[]
    | null /** All values that are contained in given list. */;
  status_not_in?:
    | Status[]
    | null /** All values that are not contained in given list. */;
  id?: string | null;
  id_not?: string | null /** All values that are not equal to given value. */;
  id_in?: string[] | null /** All values that are contained in given list. */;
  id_not_in?:
    | string[]
    | null /** All values that are not contained in given list. */;
  id_lt?: string | null /** All values less than the given value. */;
  id_lte?: string | null /** All values less than or equal the given value. */;
  id_gt?: string | null /** All values greater than the given value. */;
  id_gte?:
    | string
    | null /** All values greater than or equal the given value. */;
  id_contains?: string | null /** All values containing the given string. */;
  id_not_contains?:
    | string
    | null /** All values not containing the given string. */;
  id_starts_with?:
    | string
    | null /** All values starting with the given string. */;
  id_not_starts_with?:
    | string
    | null /** All values not starting with the given string. */;
  id_ends_with?: string | null /** All values ending with the given string. */;
  id_not_ends_with?:
    | string
    | null /** All values not ending with the given string. */;
  createdAt?: DateTime | null;
  createdAt_not?: DateTime | null /** All values that are not equal to given value. */;
  createdAt_in?:
    | DateTime[]
    | null /** All values that are contained in given list. */;
  createdAt_not_in?:
    | DateTime[]
    | null /** All values that are not contained in given list. */;
  createdAt_lt?: DateTime | null /** All values less than the given value. */;
  createdAt_lte?: DateTime | null /** All values less than or equal the given value. */;
  createdAt_gt?: DateTime | null /** All values greater than the given value. */;
  createdAt_gte?: DateTime | null /** All values greater than or equal the given value. */;
  updatedAt?: DateTime | null;
  updatedAt_not?: DateTime | null /** All values that are not equal to given value. */;
  updatedAt_in?:
    | DateTime[]
    | null /** All values that are contained in given list. */;
  updatedAt_not_in?:
    | DateTime[]
    | null /** All values that are not contained in given list. */;
  updatedAt_lt?: DateTime | null /** All values less than the given value. */;
  updatedAt_lte?: DateTime | null /** All values less than or equal the given value. */;
  updatedAt_gt?: DateTime | null /** All values greater than the given value. */;
  updatedAt_gte?: DateTime | null /** All values greater than or equal the given value. */;
  value?: string | null;
  value_not?:
    | string
    | null /** All values that are not equal to given value. */;
  value_in?:
    | string[]
    | null /** All values that are contained in given list. */;
  value_not_in?:
    | string[]
    | null /** All values that are not contained in given list. */;
  value_lt?: string | null /** All values less than the given value. */;
  value_lte?:
    | string
    | null /** All values less than or equal the given value. */;
  value_gt?: string | null /** All values greater than the given value. */;
  value_gte?:
    | string
    | null /** All values greater than or equal the given value. */;
  value_contains?: string | null /** All values containing the given string. */;
  value_not_contains?:
    | string
    | null /** All values not containing the given string. */;
  value_starts_with?:
    | string
    | null /** All values starting with the given string. */;
  value_not_starts_with?:
    | string
    | null /** All values not starting with the given string. */;
  value_ends_with?:
    | string
    | null /** All values ending with the given string. */;
  value_not_ends_with?:
    | string
    | null /** All values not ending with the given string. */;
  translations_every?: TranslationWhereInput | null;
  translations_some?: TranslationWhereInput | null;
  translations_none?: TranslationWhereInput | null;
  perilCategoryTitle?: PerilCategoryWhereInput | null;
  perilCategoryDescription?: PerilCategoryWhereInput | null;
  perilTitle?: PerilWhereInput | null;
  perilDescription?: PerilWhereInput | null;
}

export interface PerilCategoryWhereInput {
  AND?:
    | PerilCategoryWhereInput[]
    | null /** Logical AND on all given filters. */;
  OR?: PerilCategoryWhereInput[] | null /** Logical OR on all given filters. */;
  NOT?:
    | PerilCategoryWhereInput[]
    | null /** Logical NOT on all given filters combined by AND. */;
  status?: Status | null;
  status_not?: Status | null /** All values that are not equal to given value. */;
  status_in?:
    | Status[]
    | null /** All values that are contained in given list. */;
  status_not_in?:
    | Status[]
    | null /** All values that are not contained in given list. */;
  id?: string | null;
  id_not?: string | null /** All values that are not equal to given value. */;
  id_in?: string[] | null /** All values that are contained in given list. */;
  id_not_in?:
    | string[]
    | null /** All values that are not contained in given list. */;
  id_lt?: string | null /** All values less than the given value. */;
  id_lte?: string | null /** All values less than or equal the given value. */;
  id_gt?: string | null /** All values greater than the given value. */;
  id_gte?:
    | string
    | null /** All values greater than or equal the given value. */;
  id_contains?: string | null /** All values containing the given string. */;
  id_not_contains?:
    | string
    | null /** All values not containing the given string. */;
  id_starts_with?:
    | string
    | null /** All values starting with the given string. */;
  id_not_starts_with?:
    | string
    | null /** All values not starting with the given string. */;
  id_ends_with?: string | null /** All values ending with the given string. */;
  id_not_ends_with?:
    | string
    | null /** All values not ending with the given string. */;
  createdAt?: DateTime | null;
  createdAt_not?: DateTime | null /** All values that are not equal to given value. */;
  createdAt_in?:
    | DateTime[]
    | null /** All values that are contained in given list. */;
  createdAt_not_in?:
    | DateTime[]
    | null /** All values that are not contained in given list. */;
  createdAt_lt?: DateTime | null /** All values less than the given value. */;
  createdAt_lte?: DateTime | null /** All values less than or equal the given value. */;
  createdAt_gt?: DateTime | null /** All values greater than the given value. */;
  createdAt_gte?: DateTime | null /** All values greater than or equal the given value. */;
  updatedAt?: DateTime | null;
  updatedAt_not?: DateTime | null /** All values that are not equal to given value. */;
  updatedAt_in?:
    | DateTime[]
    | null /** All values that are contained in given list. */;
  updatedAt_not_in?:
    | DateTime[]
    | null /** All values that are not contained in given list. */;
  updatedAt_lt?: DateTime | null /** All values less than the given value. */;
  updatedAt_lte?: DateTime | null /** All values less than or equal the given value. */;
  updatedAt_gt?: DateTime | null /** All values greater than the given value. */;
  updatedAt_gte?: DateTime | null /** All values greater than or equal the given value. */;
  name?: string | null;
  name_not?: string | null /** All values that are not equal to given value. */;
  name_in?: string[] | null /** All values that are contained in given list. */;
  name_not_in?:
    | string[]
    | null /** All values that are not contained in given list. */;
  name_lt?: string | null /** All values less than the given value. */;
  name_lte?:
    | string
    | null /** All values less than or equal the given value. */;
  name_gt?: string | null /** All values greater than the given value. */;
  name_gte?:
    | string
    | null /** All values greater than or equal the given value. */;
  name_contains?: string | null /** All values containing the given string. */;
  name_not_contains?:
    | string
    | null /** All values not containing the given string. */;
  name_starts_with?:
    | string
    | null /** All values starting with the given string. */;
  name_not_starts_with?:
    | string
    | null /** All values not starting with the given string. */;
  name_ends_with?:
    | string
    | null /** All values ending with the given string. */;
  name_not_ends_with?:
    | string
    | null /** All values not ending with the given string. */;
  perils_every?: PerilWhereInput | null;
  perils_some?: PerilWhereInput | null;
  perils_none?: PerilWhereInput | null;
  titleKey?: KeyWhereInput | null;
  descriptionKey?: KeyWhereInput | null;
}

export interface PerilWhereInput {
  AND?: PerilWhereInput[] | null /** Logical AND on all given filters. */;
  OR?: PerilWhereInput[] | null /** Logical OR on all given filters. */;
  NOT?:
    | PerilWhereInput[]
    | null /** Logical NOT on all given filters combined by AND. */;
  status?: Status | null;
  status_not?: Status | null /** All values that are not equal to given value. */;
  status_in?:
    | Status[]
    | null /** All values that are contained in given list. */;
  status_not_in?:
    | Status[]
    | null /** All values that are not contained in given list. */;
  id?: string | null;
  id_not?: string | null /** All values that are not equal to given value. */;
  id_in?: string[] | null /** All values that are contained in given list. */;
  id_not_in?:
    | string[]
    | null /** All values that are not contained in given list. */;
  id_lt?: string | null /** All values less than the given value. */;
  id_lte?: string | null /** All values less than or equal the given value. */;
  id_gt?: string | null /** All values greater than the given value. */;
  id_gte?:
    | string
    | null /** All values greater than or equal the given value. */;
  id_contains?: string | null /** All values containing the given string. */;
  id_not_contains?:
    | string
    | null /** All values not containing the given string. */;
  id_starts_with?:
    | string
    | null /** All values starting with the given string. */;
  id_not_starts_with?:
    | string
    | null /** All values not starting with the given string. */;
  id_ends_with?: string | null /** All values ending with the given string. */;
  id_not_ends_with?:
    | string
    | null /** All values not ending with the given string. */;
  createdAt?: DateTime | null;
  createdAt_not?: DateTime | null /** All values that are not equal to given value. */;
  createdAt_in?:
    | DateTime[]
    | null /** All values that are contained in given list. */;
  createdAt_not_in?:
    | DateTime[]
    | null /** All values that are not contained in given list. */;
  createdAt_lt?: DateTime | null /** All values less than the given value. */;
  createdAt_lte?: DateTime | null /** All values less than or equal the given value. */;
  createdAt_gt?: DateTime | null /** All values greater than the given value. */;
  createdAt_gte?: DateTime | null /** All values greater than or equal the given value. */;
  updatedAt?: DateTime | null;
  updatedAt_not?: DateTime | null /** All values that are not equal to given value. */;
  updatedAt_in?:
    | DateTime[]
    | null /** All values that are contained in given list. */;
  updatedAt_not_in?:
    | DateTime[]
    | null /** All values that are not contained in given list. */;
  updatedAt_lt?: DateTime | null /** All values less than the given value. */;
  updatedAt_lte?: DateTime | null /** All values less than or equal the given value. */;
  updatedAt_gt?: DateTime | null /** All values greater than the given value. */;
  updatedAt_gte?: DateTime | null /** All values greater than or equal the given value. */;
  perilCategory?: PerilCategoryWhereInput | null;
  titleKey?: KeyWhereInput | null;
  descriptionKey?: KeyWhereInput | null;
}

export interface OfferInput {
  firstName: string;
  lastName: string;
  age: number;
  address: string;
  postalNumber: string;
  city?: string | null;
  insuranceType: InsuranceType;
  squareMeters: number;
  personsInHousehold: number;
  previousInsurer?: string | null;
}

export interface SignInput {
  personalNumber: string;
  email: string;
}

export interface AssetWhereInput {
  AND?: AssetWhereInput[] | null /** Logical AND on all given filters. */;
  OR?: AssetWhereInput[] | null /** Logical OR on all given filters. */;
  NOT?:
    | AssetWhereInput[]
    | null /** Logical NOT on all given filters combined by AND. */;
  status?: Status | null;
  status_not?: Status | null /** All values that are not equal to given value. */;
  status_in?:
    | Status[]
    | null /** All values that are contained in given list. */;
  status_not_in?:
    | Status[]
    | null /** All values that are not contained in given list. */;
  id?: string | null;
  id_not?: string | null /** All values that are not equal to given value. */;
  id_in?: string[] | null /** All values that are contained in given list. */;
  id_not_in?:
    | string[]
    | null /** All values that are not contained in given list. */;
  id_lt?: string | null /** All values less than the given value. */;
  id_lte?: string | null /** All values less than or equal the given value. */;
  id_gt?: string | null /** All values greater than the given value. */;
  id_gte?:
    | string
    | null /** All values greater than or equal the given value. */;
  id_contains?: string | null /** All values containing the given string. */;
  id_not_contains?:
    | string
    | null /** All values not containing the given string. */;
  id_starts_with?:
    | string
    | null /** All values starting with the given string. */;
  id_not_starts_with?:
    | string
    | null /** All values not starting with the given string. */;
  id_ends_with?: string | null /** All values ending with the given string. */;
  id_not_ends_with?:
    | string
    | null /** All values not ending with the given string. */;
  createdAt?: DateTime | null;
  createdAt_not?: DateTime | null /** All values that are not equal to given value. */;
  createdAt_in?:
    | DateTime[]
    | null /** All values that are contained in given list. */;
  createdAt_not_in?:
    | DateTime[]
    | null /** All values that are not contained in given list. */;
  createdAt_lt?: DateTime | null /** All values less than the given value. */;
  createdAt_lte?: DateTime | null /** All values less than or equal the given value. */;
  createdAt_gt?: DateTime | null /** All values greater than the given value. */;
  createdAt_gte?: DateTime | null /** All values greater than or equal the given value. */;
  updatedAt?: DateTime | null;
  updatedAt_not?: DateTime | null /** All values that are not equal to given value. */;
  updatedAt_in?:
    | DateTime[]
    | null /** All values that are contained in given list. */;
  updatedAt_not_in?:
    | DateTime[]
    | null /** All values that are not contained in given list. */;
  updatedAt_lt?: DateTime | null /** All values less than the given value. */;
  updatedAt_lte?: DateTime | null /** All values less than or equal the given value. */;
  updatedAt_gt?: DateTime | null /** All values greater than the given value. */;
  updatedAt_gte?: DateTime | null /** All values greater than or equal the given value. */;
  handle?: string | null;
  handle_not?:
    | string
    | null /** All values that are not equal to given value. */;
  handle_in?:
    | string[]
    | null /** All values that are contained in given list. */;
  handle_not_in?:
    | string[]
    | null /** All values that are not contained in given list. */;
  handle_lt?: string | null /** All values less than the given value. */;
  handle_lte?:
    | string
    | null /** All values less than or equal the given value. */;
  handle_gt?: string | null /** All values greater than the given value. */;
  handle_gte?:
    | string
    | null /** All values greater than or equal the given value. */;
  handle_contains?:
    | string
    | null /** All values containing the given string. */;
  handle_not_contains?:
    | string
    | null /** All values not containing the given string. */;
  handle_starts_with?:
    | string
    | null /** All values starting with the given string. */;
  handle_not_starts_with?:
    | string
    | null /** All values not starting with the given string. */;
  handle_ends_with?:
    | string
    | null /** All values ending with the given string. */;
  handle_not_ends_with?:
    | string
    | null /** All values not ending with the given string. */;
  fileName?: string | null;
  fileName_not?:
    | string
    | null /** All values that are not equal to given value. */;
  fileName_in?:
    | string[]
    | null /** All values that are contained in given list. */;
  fileName_not_in?:
    | string[]
    | null /** All values that are not contained in given list. */;
  fileName_lt?: string | null /** All values less than the given value. */;
  fileName_lte?:
    | string
    | null /** All values less than or equal the given value. */;
  fileName_gt?: string | null /** All values greater than the given value. */;
  fileName_gte?:
    | string
    | null /** All values greater than or equal the given value. */;
  fileName_contains?:
    | string
    | null /** All values containing the given string. */;
  fileName_not_contains?:
    | string
    | null /** All values not containing the given string. */;
  fileName_starts_with?:
    | string
    | null /** All values starting with the given string. */;
  fileName_not_starts_with?:
    | string
    | null /** All values not starting with the given string. */;
  fileName_ends_with?:
    | string
    | null /** All values ending with the given string. */;
  fileName_not_ends_with?:
    | string
    | null /** All values not ending with the given string. */;
  height?: number | null;
  height_not?:
    | number
    | null /** All values that are not equal to given value. */;
  height_in?:
    | number[]
    | null /** All values that are contained in given list. */;
  height_not_in?:
    | number[]
    | null /** All values that are not contained in given list. */;
  height_lt?: number | null /** All values less than the given value. */;
  height_lte?:
    | number
    | null /** All values less than or equal the given value. */;
  height_gt?: number | null /** All values greater than the given value. */;
  height_gte?:
    | number
    | null /** All values greater than or equal the given value. */;
  mimeType?: string | null;
  mimeType_not?:
    | string
    | null /** All values that are not equal to given value. */;
  mimeType_in?:
    | string[]
    | null /** All values that are contained in given list. */;
  mimeType_not_in?:
    | string[]
    | null /** All values that are not contained in given list. */;
  mimeType_lt?: string | null /** All values less than the given value. */;
  mimeType_lte?:
    | string
    | null /** All values less than or equal the given value. */;
  mimeType_gt?: string | null /** All values greater than the given value. */;
  mimeType_gte?:
    | string
    | null /** All values greater than or equal the given value. */;
  mimeType_contains?:
    | string
    | null /** All values containing the given string. */;
  mimeType_not_contains?:
    | string
    | null /** All values not containing the given string. */;
  mimeType_starts_with?:
    | string
    | null /** All values starting with the given string. */;
  mimeType_not_starts_with?:
    | string
    | null /** All values not starting with the given string. */;
  mimeType_ends_with?:
    | string
    | null /** All values ending with the given string. */;
  mimeType_not_ends_with?:
    | string
    | null /** All values not ending with the given string. */;
  size?: number | null;
  size_not?: number | null /** All values that are not equal to given value. */;
  size_in?: number[] | null /** All values that are contained in given list. */;
  size_not_in?:
    | number[]
    | null /** All values that are not contained in given list. */;
  size_lt?: number | null /** All values less than the given value. */;
  size_lte?:
    | number
    | null /** All values less than or equal the given value. */;
  size_gt?: number | null /** All values greater than the given value. */;
  size_gte?:
    | number
    | null /** All values greater than or equal the given value. */;
  width?: number | null;
  width_not?:
    | number
    | null /** All values that are not equal to given value. */;
  width_in?:
    | number[]
    | null /** All values that are contained in given list. */;
  width_not_in?:
    | number[]
    | null /** All values that are not contained in given list. */;
  width_lt?: number | null /** All values less than the given value. */;
  width_lte?:
    | number
    | null /** All values less than or equal the given value. */;
  width_gt?: number | null /** All values greater than the given value. */;
  width_gte?:
    | number
    | null /** All values greater than or equal the given value. */;
}
/** Transformations for Assets */
export interface AssetTransformationInput {
  image?: ImageTransformationInput | null;
  document?: DocumentTransformationInput | null;
  validateOptions?:
    | boolean
    | null /** Pass `true` if you want to validate the passed transformation parameters */;
}
/** Transformations for Images */
export interface ImageTransformationInput {
  resize?: ImageResizeInput | null /** Resizes the image */;
}

export interface ImageResizeInput {
  width?:
    | number
    | null /** The width in pixels to resize the image to. The value must be an integer from 1 to 10000. */;
  height?:
    | number
    | null /** The height in pixels to resize the image to. The value must be an integer from 1 to 10000. */;
  fit?: ImageFit | null /** The default value for the fit parameter is fit:clip. */;
}
/** Transformations for Documents */
export interface DocumentTransformationInput {
  output?: DocumentOutputInput | null /** Changes the output for the file. */;
}

export interface DocumentOutputInput {
  format?: DocumentFileTypes | null /** Transforms a document into a desired file type.See this matrix for format support:PDF:	jpg, odp, ods, odt, png, svg, txt, and webpDOC:	docx, html, jpg, odt, pdf, png, svg, txt, and webpDOCX:	doc, html, jpg, odt, pdf, png, svg, txt, and webpODT:	doc, docx, html, jpg, pdf, png, svg, txt, and webpXLS:	jpg, pdf, ods, png, svg, xlsx, and webpXLSX:	jpg, pdf, ods, png, svg, xls, and webpODS:	jpg, pdf, png, xls, svg, xlsx, and webpPPT:	jpg, odp, pdf, png, svg, pptx, and webpPPTX:	jpg, odp, pdf, png, svg, ppt, and webpODP:	jpg, pdf, png, ppt, svg, pptx, and webpBMP:	jpg, odp, ods, odt, pdf, png, svg, and webpGIF:	jpg, odp, ods, odt, pdf, png, svg, and webpJPG:	jpg, odp, ods, odt, pdf, png, svg, and webpPNG:	jpg, odp, ods, odt, pdf, png, svg, and webpWEBP:	jpg, odp, ods, odt, pdf, png, svg, and webpTIFF:	jpg, odp, ods, odt, pdf, png, svg, and webpAI:	    jpg, odp, ods, odt, pdf, png, svg, and webpPSD:	jpg, odp, ods, odt, pdf, png, svg, and webpSVG:	jpg, odp, ods, odt, pdf, png, and webpHTML:	jpg, odt, pdf, svg, txt, and webpTXT:	jpg, html, odt, pdf, svg, and webp */;
}

export interface ColorWhereInput {
  AND?: ColorWhereInput[] | null /** Logical AND on all given filters. */;
  OR?: ColorWhereInput[] | null /** Logical OR on all given filters. */;
  NOT?:
    | ColorWhereInput[]
    | null /** Logical NOT on all given filters combined by AND. */;
  id?: string | null;
  id_not?: string | null /** All values that are not equal to given value. */;
  id_in?: string[] | null /** All values that are contained in given list. */;
  id_not_in?:
    | string[]
    | null /** All values that are not contained in given list. */;
  id_lt?: string | null /** All values less than the given value. */;
  id_lte?: string | null /** All values less than or equal the given value. */;
  id_gt?: string | null /** All values greater than the given value. */;
  id_gte?:
    | string
    | null /** All values greater than or equal the given value. */;
  id_contains?: string | null /** All values containing the given string. */;
  id_not_contains?:
    | string
    | null /** All values not containing the given string. */;
  id_starts_with?:
    | string
    | null /** All values starting with the given string. */;
  id_not_starts_with?:
    | string
    | null /** All values not starting with the given string. */;
  id_ends_with?: string | null /** All values ending with the given string. */;
  id_not_ends_with?:
    | string
    | null /** All values not ending with the given string. */;
  createdAt?: DateTime | null;
  createdAt_not?: DateTime | null /** All values that are not equal to given value. */;
  createdAt_in?:
    | DateTime[]
    | null /** All values that are contained in given list. */;
  createdAt_not_in?:
    | DateTime[]
    | null /** All values that are not contained in given list. */;
  createdAt_lt?: DateTime | null /** All values less than the given value. */;
  createdAt_lte?: DateTime | null /** All values less than or equal the given value. */;
  createdAt_gt?: DateTime | null /** All values greater than the given value. */;
  createdAt_gte?: DateTime | null /** All values greater than or equal the given value. */;
  updatedAt?: DateTime | null;
  updatedAt_not?: DateTime | null /** All values that are not equal to given value. */;
  updatedAt_in?:
    | DateTime[]
    | null /** All values that are contained in given list. */;
  updatedAt_not_in?:
    | DateTime[]
    | null /** All values that are not contained in given list. */;
  updatedAt_lt?: DateTime | null /** All values less than the given value. */;
  updatedAt_lte?: DateTime | null /** All values less than or equal the given value. */;
  updatedAt_gt?: DateTime | null /** All values greater than the given value. */;
  updatedAt_gte?: DateTime | null /** All values greater than or equal the given value. */;
}

export interface LocationWhereInput {
  AND?: LocationWhereInput[] | null /** Logical AND on all given filters. */;
  OR?: LocationWhereInput[] | null /** Logical OR on all given filters. */;
  NOT?:
    | LocationWhereInput[]
    | null /** Logical NOT on all given filters combined by AND. */;
  id?: string | null;
  id_not?: string | null /** All values that are not equal to given value. */;
  id_in?: string[] | null /** All values that are contained in given list. */;
  id_not_in?:
    | string[]
    | null /** All values that are not contained in given list. */;
  id_lt?: string | null /** All values less than the given value. */;
  id_lte?: string | null /** All values less than or equal the given value. */;
  id_gt?: string | null /** All values greater than the given value. */;
  id_gte?:
    | string
    | null /** All values greater than or equal the given value. */;
  id_contains?: string | null /** All values containing the given string. */;
  id_not_contains?:
    | string
    | null /** All values not containing the given string. */;
  id_starts_with?:
    | string
    | null /** All values starting with the given string. */;
  id_not_starts_with?:
    | string
    | null /** All values not starting with the given string. */;
  id_ends_with?: string | null /** All values ending with the given string. */;
  id_not_ends_with?:
    | string
    | null /** All values not ending with the given string. */;
  createdAt?: DateTime | null;
  createdAt_not?: DateTime | null /** All values that are not equal to given value. */;
  createdAt_in?:
    | DateTime[]
    | null /** All values that are contained in given list. */;
  createdAt_not_in?:
    | DateTime[]
    | null /** All values that are not contained in given list. */;
  createdAt_lt?: DateTime | null /** All values less than the given value. */;
  createdAt_lte?: DateTime | null /** All values less than or equal the given value. */;
  createdAt_gt?: DateTime | null /** All values greater than the given value. */;
  createdAt_gte?: DateTime | null /** All values greater than or equal the given value. */;
  updatedAt?: DateTime | null;
  updatedAt_not?: DateTime | null /** All values that are not equal to given value. */;
  updatedAt_in?:
    | DateTime[]
    | null /** All values that are contained in given list. */;
  updatedAt_not_in?:
    | DateTime[]
    | null /** All values that are not contained in given list. */;
  updatedAt_lt?: DateTime | null /** All values less than the given value. */;
  updatedAt_lte?: DateTime | null /** All values less than or equal the given value. */;
  updatedAt_gt?: DateTime | null /** All values greater than the given value. */;
  updatedAt_gte?: DateTime | null /** All values greater than or equal the given value. */;
}

export interface AssetWhereUniqueInput {
  id?: string | null;
  handle?: string | null;
}

export interface ColorWhereUniqueInput {
  id?: string | null;
}

export interface LocationWhereUniqueInput {
  id?: string | null;
}

export interface LanguageWhereUniqueInput {
  id?: string | null;
  code?: string | null;
  name?: string | null;
}

export interface KeyWhereUniqueInput {
  id?: string | null;
  value?: string | null;
}

export interface TranslationWhereUniqueInput {
  id?: string | null;
  text?: string | null;
}

export interface PerilWhereUniqueInput {
  id?: string | null;
}

export interface PerilCategoryWhereUniqueInput {
  id?: string | null;
  name?: string | null;
}

export interface AssetCreateInput {
  status?: Status | null;
  handle: string;
  fileName: string;
  height?: number | null;
  mimeType?: string | null;
  size?: number | null;
  width?: number | null;
}

export interface LanguageCreateInput {
  status?: Status | null;
  code: string;
  name: string;
  translations?: TranslationCreateManyWithoutLanguageInput | null;
}

export interface TranslationCreateManyWithoutLanguageInput {
  create?: TranslationCreateWithoutLanguageInput[] | null;
  connect?: TranslationWhereUniqueInput[] | null;
}

export interface TranslationCreateWithoutLanguageInput {
  status?: Status | null;
  project?: Project | null;
  text: string;
  key?: KeyCreateOneWithoutTranslationsInput | null;
}

export interface KeyCreateOneWithoutTranslationsInput {
  create?: KeyCreateWithoutTranslationsInput | null;
  connect?: KeyWhereUniqueInput | null;
}

export interface KeyCreateWithoutTranslationsInput {
  status?: Status | null;
  value: string;
  perilCategoryTitle?: PerilCategoryCreateOneWithoutTitleKeyInput | null;
  perilCategoryDescription?: PerilCategoryCreateOneWithoutDescriptionKeyInput | null;
  perilTitle?: PerilCreateOneWithoutTitleKeyInput | null;
  perilDescription?: PerilCreateOneWithoutDescriptionKeyInput | null;
}

export interface PerilCategoryCreateOneWithoutTitleKeyInput {
  create?: PerilCategoryCreateWithoutTitleKeyInput | null;
  connect?: PerilCategoryWhereUniqueInput | null;
}

export interface PerilCategoryCreateWithoutTitleKeyInput {
  status?: Status | null;
  name: string;
  perils?: PerilCreateManyWithoutPerilCategoryInput | null;
  descriptionKey?: KeyCreateOneWithoutPerilCategoryDescriptionInput | null;
}

export interface PerilCreateManyWithoutPerilCategoryInput {
  create?: PerilCreateWithoutPerilCategoryInput[] | null;
  connect?: PerilWhereUniqueInput[] | null;
}

export interface PerilCreateWithoutPerilCategoryInput {
  status?: Status | null;
  titleKey?: KeyCreateOneWithoutPerilTitleInput | null;
  descriptionKey?: KeyCreateOneWithoutPerilDescriptionInput | null;
}

export interface KeyCreateOneWithoutPerilTitleInput {
  create?: KeyCreateWithoutPerilTitleInput | null;
  connect?: KeyWhereUniqueInput | null;
}

export interface KeyCreateWithoutPerilTitleInput {
  status?: Status | null;
  value: string;
  translations?: TranslationCreateManyWithoutKeyInput | null;
  perilCategoryTitle?: PerilCategoryCreateOneWithoutTitleKeyInput | null;
  perilCategoryDescription?: PerilCategoryCreateOneWithoutDescriptionKeyInput | null;
  perilDescription?: PerilCreateOneWithoutDescriptionKeyInput | null;
}

export interface TranslationCreateManyWithoutKeyInput {
  create?: TranslationCreateWithoutKeyInput[] | null;
  connect?: TranslationWhereUniqueInput[] | null;
}

export interface TranslationCreateWithoutKeyInput {
  status?: Status | null;
  project?: Project | null;
  text: string;
  language?: LanguageCreateOneWithoutTranslationsInput | null;
}

export interface LanguageCreateOneWithoutTranslationsInput {
  create?: LanguageCreateWithoutTranslationsInput | null;
  connect?: LanguageWhereUniqueInput | null;
}

export interface LanguageCreateWithoutTranslationsInput {
  status?: Status | null;
  code: string;
  name: string;
}

export interface PerilCategoryCreateOneWithoutDescriptionKeyInput {
  create?: PerilCategoryCreateWithoutDescriptionKeyInput | null;
  connect?: PerilCategoryWhereUniqueInput | null;
}

export interface PerilCategoryCreateWithoutDescriptionKeyInput {
  status?: Status | null;
  name: string;
  perils?: PerilCreateManyWithoutPerilCategoryInput | null;
  titleKey?: KeyCreateOneWithoutPerilCategoryTitleInput | null;
}

export interface KeyCreateOneWithoutPerilCategoryTitleInput {
  create?: KeyCreateWithoutPerilCategoryTitleInput | null;
  connect?: KeyWhereUniqueInput | null;
}

export interface KeyCreateWithoutPerilCategoryTitleInput {
  status?: Status | null;
  value: string;
  translations?: TranslationCreateManyWithoutKeyInput | null;
  perilCategoryDescription?: PerilCategoryCreateOneWithoutDescriptionKeyInput | null;
  perilTitle?: PerilCreateOneWithoutTitleKeyInput | null;
  perilDescription?: PerilCreateOneWithoutDescriptionKeyInput | null;
}

export interface PerilCreateOneWithoutTitleKeyInput {
  create?: PerilCreateWithoutTitleKeyInput | null;
  connect?: PerilWhereUniqueInput | null;
}

export interface PerilCreateWithoutTitleKeyInput {
  status?: Status | null;
  perilCategory?: PerilCategoryCreateOneWithoutPerilsInput | null;
  descriptionKey?: KeyCreateOneWithoutPerilDescriptionInput | null;
}

export interface PerilCategoryCreateOneWithoutPerilsInput {
  create?: PerilCategoryCreateWithoutPerilsInput | null;
  connect?: PerilCategoryWhereUniqueInput | null;
}

export interface PerilCategoryCreateWithoutPerilsInput {
  status?: Status | null;
  name: string;
  titleKey?: KeyCreateOneWithoutPerilCategoryTitleInput | null;
  descriptionKey?: KeyCreateOneWithoutPerilCategoryDescriptionInput | null;
}

export interface KeyCreateOneWithoutPerilCategoryDescriptionInput {
  create?: KeyCreateWithoutPerilCategoryDescriptionInput | null;
  connect?: KeyWhereUniqueInput | null;
}

export interface KeyCreateWithoutPerilCategoryDescriptionInput {
  status?: Status | null;
  value: string;
  translations?: TranslationCreateManyWithoutKeyInput | null;
  perilCategoryTitle?: PerilCategoryCreateOneWithoutTitleKeyInput | null;
  perilTitle?: PerilCreateOneWithoutTitleKeyInput | null;
  perilDescription?: PerilCreateOneWithoutDescriptionKeyInput | null;
}

export interface PerilCreateOneWithoutDescriptionKeyInput {
  create?: PerilCreateWithoutDescriptionKeyInput | null;
  connect?: PerilWhereUniqueInput | null;
}

export interface PerilCreateWithoutDescriptionKeyInput {
  status?: Status | null;
  perilCategory?: PerilCategoryCreateOneWithoutPerilsInput | null;
  titleKey?: KeyCreateOneWithoutPerilTitleInput | null;
}

export interface KeyCreateOneWithoutPerilDescriptionInput {
  create?: KeyCreateWithoutPerilDescriptionInput | null;
  connect?: KeyWhereUniqueInput | null;
}

export interface KeyCreateWithoutPerilDescriptionInput {
  status?: Status | null;
  value: string;
  translations?: TranslationCreateManyWithoutKeyInput | null;
  perilCategoryTitle?: PerilCategoryCreateOneWithoutTitleKeyInput | null;
  perilCategoryDescription?: PerilCategoryCreateOneWithoutDescriptionKeyInput | null;
  perilTitle?: PerilCreateOneWithoutTitleKeyInput | null;
}

export interface KeyCreateInput {
  status?: Status | null;
  value: string;
  translations?: TranslationCreateManyWithoutKeyInput | null;
  perilCategoryTitle?: PerilCategoryCreateOneWithoutTitleKeyInput | null;
  perilCategoryDescription?: PerilCategoryCreateOneWithoutDescriptionKeyInput | null;
  perilTitle?: PerilCreateOneWithoutTitleKeyInput | null;
  perilDescription?: PerilCreateOneWithoutDescriptionKeyInput | null;
}

export interface TranslationCreateInput {
  status?: Status | null;
  project?: Project | null;
  text: string;
  language?: LanguageCreateOneWithoutTranslationsInput | null;
  key?: KeyCreateOneWithoutTranslationsInput | null;
}

export interface PerilCreateInput {
  status?: Status | null;
  perilCategory?: PerilCategoryCreateOneWithoutPerilsInput | null;
  titleKey?: KeyCreateOneWithoutPerilTitleInput | null;
  descriptionKey?: KeyCreateOneWithoutPerilDescriptionInput | null;
}

export interface PerilCategoryCreateInput {
  status?: Status | null;
  name: string;
  perils?: PerilCreateManyWithoutPerilCategoryInput | null;
  titleKey?: KeyCreateOneWithoutPerilCategoryTitleInput | null;
  descriptionKey?: KeyCreateOneWithoutPerilCategoryDescriptionInput | null;
}

export interface AssetUpdateInput {
  status?: Status | null;
  handle?: string | null;
  fileName?: string | null;
  height?: number | null;
  mimeType?: string | null;
  size?: number | null;
  width?: number | null;
}

export interface LanguageUpdateInput {
  status?: Status | null;
  code?: string | null;
  name?: string | null;
  translations?: TranslationUpdateManyWithoutLanguageInput | null;
}

export interface TranslationUpdateManyWithoutLanguageInput {
  create?: TranslationCreateWithoutLanguageInput[] | null;
  connect?: TranslationWhereUniqueInput[] | null;
  disconnect?: TranslationWhereUniqueInput[] | null;
  delete?: TranslationWhereUniqueInput[] | null;
  update?: TranslationUpdateWithWhereUniqueWithoutLanguageInput[] | null;
  upsert?: TranslationUpsertWithWhereUniqueWithoutLanguageInput[] | null;
}

export interface TranslationUpdateWithWhereUniqueWithoutLanguageInput {
  where: TranslationWhereUniqueInput;
  data: TranslationUpdateWithoutLanguageDataInput;
}

export interface TranslationUpdateWithoutLanguageDataInput {
  status?: Status | null;
  project?: Project | null;
  text?: string | null;
  key?: KeyUpdateOneWithoutTranslationsInput | null;
}

export interface KeyUpdateOneWithoutTranslationsInput {
  create?: KeyCreateWithoutTranslationsInput | null;
  connect?: KeyWhereUniqueInput | null;
  disconnect?: boolean | null;
  delete?: boolean | null;
  update?: KeyUpdateWithoutTranslationsDataInput | null;
  upsert?: KeyUpsertWithoutTranslationsInput | null;
}

export interface KeyUpdateWithoutTranslationsDataInput {
  status?: Status | null;
  value?: string | null;
  perilCategoryTitle?: PerilCategoryUpdateOneWithoutTitleKeyInput | null;
  perilCategoryDescription?: PerilCategoryUpdateOneWithoutDescriptionKeyInput | null;
  perilTitle?: PerilUpdateOneWithoutTitleKeyInput | null;
  perilDescription?: PerilUpdateOneWithoutDescriptionKeyInput | null;
}

export interface PerilCategoryUpdateOneWithoutTitleKeyInput {
  create?: PerilCategoryCreateWithoutTitleKeyInput | null;
  connect?: PerilCategoryWhereUniqueInput | null;
  disconnect?: boolean | null;
  delete?: boolean | null;
  update?: PerilCategoryUpdateWithoutTitleKeyDataInput | null;
  upsert?: PerilCategoryUpsertWithoutTitleKeyInput | null;
}

export interface PerilCategoryUpdateWithoutTitleKeyDataInput {
  status?: Status | null;
  name?: string | null;
  perils?: PerilUpdateManyWithoutPerilCategoryInput | null;
  descriptionKey?: KeyUpdateOneWithoutPerilCategoryDescriptionInput | null;
}

export interface PerilUpdateManyWithoutPerilCategoryInput {
  create?: PerilCreateWithoutPerilCategoryInput[] | null;
  connect?: PerilWhereUniqueInput[] | null;
  disconnect?: PerilWhereUniqueInput[] | null;
  delete?: PerilWhereUniqueInput[] | null;
  update?: PerilUpdateWithWhereUniqueWithoutPerilCategoryInput[] | null;
  upsert?: PerilUpsertWithWhereUniqueWithoutPerilCategoryInput[] | null;
}

export interface PerilUpdateWithWhereUniqueWithoutPerilCategoryInput {
  where: PerilWhereUniqueInput;
  data: PerilUpdateWithoutPerilCategoryDataInput;
}

export interface PerilUpdateWithoutPerilCategoryDataInput {
  status?: Status | null;
  titleKey?: KeyUpdateOneWithoutPerilTitleInput | null;
  descriptionKey?: KeyUpdateOneWithoutPerilDescriptionInput | null;
}

export interface KeyUpdateOneWithoutPerilTitleInput {
  create?: KeyCreateWithoutPerilTitleInput | null;
  connect?: KeyWhereUniqueInput | null;
  disconnect?: boolean | null;
  delete?: boolean | null;
  update?: KeyUpdateWithoutPerilTitleDataInput | null;
  upsert?: KeyUpsertWithoutPerilTitleInput | null;
}

export interface KeyUpdateWithoutPerilTitleDataInput {
  status?: Status | null;
  value?: string | null;
  translations?: TranslationUpdateManyWithoutKeyInput | null;
  perilCategoryTitle?: PerilCategoryUpdateOneWithoutTitleKeyInput | null;
  perilCategoryDescription?: PerilCategoryUpdateOneWithoutDescriptionKeyInput | null;
  perilDescription?: PerilUpdateOneWithoutDescriptionKeyInput | null;
}

export interface TranslationUpdateManyWithoutKeyInput {
  create?: TranslationCreateWithoutKeyInput[] | null;
  connect?: TranslationWhereUniqueInput[] | null;
  disconnect?: TranslationWhereUniqueInput[] | null;
  delete?: TranslationWhereUniqueInput[] | null;
  update?: TranslationUpdateWithWhereUniqueWithoutKeyInput[] | null;
  upsert?: TranslationUpsertWithWhereUniqueWithoutKeyInput[] | null;
}

export interface TranslationUpdateWithWhereUniqueWithoutKeyInput {
  where: TranslationWhereUniqueInput;
  data: TranslationUpdateWithoutKeyDataInput;
}

export interface TranslationUpdateWithoutKeyDataInput {
  status?: Status | null;
  project?: Project | null;
  text?: string | null;
  language?: LanguageUpdateOneWithoutTranslationsInput | null;
}

export interface LanguageUpdateOneWithoutTranslationsInput {
  create?: LanguageCreateWithoutTranslationsInput | null;
  connect?: LanguageWhereUniqueInput | null;
  disconnect?: boolean | null;
  delete?: boolean | null;
  update?: LanguageUpdateWithoutTranslationsDataInput | null;
  upsert?: LanguageUpsertWithoutTranslationsInput | null;
}

export interface LanguageUpdateWithoutTranslationsDataInput {
  status?: Status | null;
  code?: string | null;
  name?: string | null;
}

export interface LanguageUpsertWithoutTranslationsInput {
  update: LanguageUpdateWithoutTranslationsDataInput;
  create: LanguageCreateWithoutTranslationsInput;
}

export interface TranslationUpsertWithWhereUniqueWithoutKeyInput {
  where: TranslationWhereUniqueInput;
  update: TranslationUpdateWithoutKeyDataInput;
  create: TranslationCreateWithoutKeyInput;
}

export interface PerilCategoryUpdateOneWithoutDescriptionKeyInput {
  create?: PerilCategoryCreateWithoutDescriptionKeyInput | null;
  connect?: PerilCategoryWhereUniqueInput | null;
  disconnect?: boolean | null;
  delete?: boolean | null;
  update?: PerilCategoryUpdateWithoutDescriptionKeyDataInput | null;
  upsert?: PerilCategoryUpsertWithoutDescriptionKeyInput | null;
}

export interface PerilCategoryUpdateWithoutDescriptionKeyDataInput {
  status?: Status | null;
  name?: string | null;
  perils?: PerilUpdateManyWithoutPerilCategoryInput | null;
  titleKey?: KeyUpdateOneWithoutPerilCategoryTitleInput | null;
}

export interface KeyUpdateOneWithoutPerilCategoryTitleInput {
  create?: KeyCreateWithoutPerilCategoryTitleInput | null;
  connect?: KeyWhereUniqueInput | null;
  disconnect?: boolean | null;
  delete?: boolean | null;
  update?: KeyUpdateWithoutPerilCategoryTitleDataInput | null;
  upsert?: KeyUpsertWithoutPerilCategoryTitleInput | null;
}

export interface KeyUpdateWithoutPerilCategoryTitleDataInput {
  status?: Status | null;
  value?: string | null;
  translations?: TranslationUpdateManyWithoutKeyInput | null;
  perilCategoryDescription?: PerilCategoryUpdateOneWithoutDescriptionKeyInput | null;
  perilTitle?: PerilUpdateOneWithoutTitleKeyInput | null;
  perilDescription?: PerilUpdateOneWithoutDescriptionKeyInput | null;
}

export interface PerilUpdateOneWithoutTitleKeyInput {
  create?: PerilCreateWithoutTitleKeyInput | null;
  connect?: PerilWhereUniqueInput | null;
  disconnect?: boolean | null;
  delete?: boolean | null;
  update?: PerilUpdateWithoutTitleKeyDataInput | null;
  upsert?: PerilUpsertWithoutTitleKeyInput | null;
}

export interface PerilUpdateWithoutTitleKeyDataInput {
  status?: Status | null;
  perilCategory?: PerilCategoryUpdateOneWithoutPerilsInput | null;
  descriptionKey?: KeyUpdateOneWithoutPerilDescriptionInput | null;
}

export interface PerilCategoryUpdateOneWithoutPerilsInput {
  create?: PerilCategoryCreateWithoutPerilsInput | null;
  connect?: PerilCategoryWhereUniqueInput | null;
  disconnect?: boolean | null;
  delete?: boolean | null;
  update?: PerilCategoryUpdateWithoutPerilsDataInput | null;
  upsert?: PerilCategoryUpsertWithoutPerilsInput | null;
}

export interface PerilCategoryUpdateWithoutPerilsDataInput {
  status?: Status | null;
  name?: string | null;
  titleKey?: KeyUpdateOneWithoutPerilCategoryTitleInput | null;
  descriptionKey?: KeyUpdateOneWithoutPerilCategoryDescriptionInput | null;
}

export interface KeyUpdateOneWithoutPerilCategoryDescriptionInput {
  create?: KeyCreateWithoutPerilCategoryDescriptionInput | null;
  connect?: KeyWhereUniqueInput | null;
  disconnect?: boolean | null;
  delete?: boolean | null;
  update?: KeyUpdateWithoutPerilCategoryDescriptionDataInput | null;
  upsert?: KeyUpsertWithoutPerilCategoryDescriptionInput | null;
}

export interface KeyUpdateWithoutPerilCategoryDescriptionDataInput {
  status?: Status | null;
  value?: string | null;
  translations?: TranslationUpdateManyWithoutKeyInput | null;
  perilCategoryTitle?: PerilCategoryUpdateOneWithoutTitleKeyInput | null;
  perilTitle?: PerilUpdateOneWithoutTitleKeyInput | null;
  perilDescription?: PerilUpdateOneWithoutDescriptionKeyInput | null;
}

export interface PerilUpdateOneWithoutDescriptionKeyInput {
  create?: PerilCreateWithoutDescriptionKeyInput | null;
  connect?: PerilWhereUniqueInput | null;
  disconnect?: boolean | null;
  delete?: boolean | null;
  update?: PerilUpdateWithoutDescriptionKeyDataInput | null;
  upsert?: PerilUpsertWithoutDescriptionKeyInput | null;
}

export interface PerilUpdateWithoutDescriptionKeyDataInput {
  status?: Status | null;
  perilCategory?: PerilCategoryUpdateOneWithoutPerilsInput | null;
  titleKey?: KeyUpdateOneWithoutPerilTitleInput | null;
}

export interface PerilUpsertWithoutDescriptionKeyInput {
  update: PerilUpdateWithoutDescriptionKeyDataInput;
  create: PerilCreateWithoutDescriptionKeyInput;
}

export interface KeyUpsertWithoutPerilCategoryDescriptionInput {
  update: KeyUpdateWithoutPerilCategoryDescriptionDataInput;
  create: KeyCreateWithoutPerilCategoryDescriptionInput;
}

export interface PerilCategoryUpsertWithoutPerilsInput {
  update: PerilCategoryUpdateWithoutPerilsDataInput;
  create: PerilCategoryCreateWithoutPerilsInput;
}

export interface KeyUpdateOneWithoutPerilDescriptionInput {
  create?: KeyCreateWithoutPerilDescriptionInput | null;
  connect?: KeyWhereUniqueInput | null;
  disconnect?: boolean | null;
  delete?: boolean | null;
  update?: KeyUpdateWithoutPerilDescriptionDataInput | null;
  upsert?: KeyUpsertWithoutPerilDescriptionInput | null;
}

export interface KeyUpdateWithoutPerilDescriptionDataInput {
  status?: Status | null;
  value?: string | null;
  translations?: TranslationUpdateManyWithoutKeyInput | null;
  perilCategoryTitle?: PerilCategoryUpdateOneWithoutTitleKeyInput | null;
  perilCategoryDescription?: PerilCategoryUpdateOneWithoutDescriptionKeyInput | null;
  perilTitle?: PerilUpdateOneWithoutTitleKeyInput | null;
}

export interface KeyUpsertWithoutPerilDescriptionInput {
  update: KeyUpdateWithoutPerilDescriptionDataInput;
  create: KeyCreateWithoutPerilDescriptionInput;
}

export interface PerilUpsertWithoutTitleKeyInput {
  update: PerilUpdateWithoutTitleKeyDataInput;
  create: PerilCreateWithoutTitleKeyInput;
}

export interface KeyUpsertWithoutPerilCategoryTitleInput {
  update: KeyUpdateWithoutPerilCategoryTitleDataInput;
  create: KeyCreateWithoutPerilCategoryTitleInput;
}

export interface PerilCategoryUpsertWithoutDescriptionKeyInput {
  update: PerilCategoryUpdateWithoutDescriptionKeyDataInput;
  create: PerilCategoryCreateWithoutDescriptionKeyInput;
}

export interface KeyUpsertWithoutPerilTitleInput {
  update: KeyUpdateWithoutPerilTitleDataInput;
  create: KeyCreateWithoutPerilTitleInput;
}

export interface PerilUpsertWithWhereUniqueWithoutPerilCategoryInput {
  where: PerilWhereUniqueInput;
  update: PerilUpdateWithoutPerilCategoryDataInput;
  create: PerilCreateWithoutPerilCategoryInput;
}

export interface PerilCategoryUpsertWithoutTitleKeyInput {
  update: PerilCategoryUpdateWithoutTitleKeyDataInput;
  create: PerilCategoryCreateWithoutTitleKeyInput;
}

export interface KeyUpsertWithoutTranslationsInput {
  update: KeyUpdateWithoutTranslationsDataInput;
  create: KeyCreateWithoutTranslationsInput;
}

export interface TranslationUpsertWithWhereUniqueWithoutLanguageInput {
  where: TranslationWhereUniqueInput;
  update: TranslationUpdateWithoutLanguageDataInput;
  create: TranslationCreateWithoutLanguageInput;
}

export interface KeyUpdateInput {
  status?: Status | null;
  value?: string | null;
  translations?: TranslationUpdateManyWithoutKeyInput | null;
  perilCategoryTitle?: PerilCategoryUpdateOneWithoutTitleKeyInput | null;
  perilCategoryDescription?: PerilCategoryUpdateOneWithoutDescriptionKeyInput | null;
  perilTitle?: PerilUpdateOneWithoutTitleKeyInput | null;
  perilDescription?: PerilUpdateOneWithoutDescriptionKeyInput | null;
}

export interface TranslationUpdateInput {
  status?: Status | null;
  project?: Project | null;
  text?: string | null;
  language?: LanguageUpdateOneWithoutTranslationsInput | null;
  key?: KeyUpdateOneWithoutTranslationsInput | null;
}

export interface PerilUpdateInput {
  status?: Status | null;
  perilCategory?: PerilCategoryUpdateOneWithoutPerilsInput | null;
  titleKey?: KeyUpdateOneWithoutPerilTitleInput | null;
  descriptionKey?: KeyUpdateOneWithoutPerilDescriptionInput | null;
}

export interface PerilCategoryUpdateInput {
  status?: Status | null;
  name?: string | null;
  perils?: PerilUpdateManyWithoutPerilCategoryInput | null;
  titleKey?: KeyUpdateOneWithoutPerilCategoryTitleInput | null;
  descriptionKey?: KeyUpdateOneWithoutPerilCategoryDescriptionInput | null;
}

export interface AssetSubscriptionWhereInput {
  AND?:
    | AssetSubscriptionWhereInput[]
    | null /** Logical AND on all given filters. */;
  OR?:
    | AssetSubscriptionWhereInput[]
    | null /** Logical OR on all given filters. */;
  NOT?:
    | AssetSubscriptionWhereInput[]
    | null /** Logical NOT on all given filters combined by AND. */;
  mutation_in?:
    | MutationType[]
    | null /** The subscription event gets dispatched when it's listed in mutation_in */;
  updatedFields_contains?:
    | string
    | null /** The subscription event gets only dispatched when one of the updated fields names is included in this list */;
  updatedFields_contains_every?:
    | string[]
    | null /** The subscription event gets only dispatched when all of the field names included in this list have been updated */;
  updatedFields_contains_some?:
    | string[]
    | null /** The subscription event gets only dispatched when some of the field names included in this list have been updated */;
  node?: AssetWhereInput | null;
}

export interface ColorSubscriptionWhereInput {
  AND?:
    | ColorSubscriptionWhereInput[]
    | null /** Logical AND on all given filters. */;
  OR?:
    | ColorSubscriptionWhereInput[]
    | null /** Logical OR on all given filters. */;
  NOT?:
    | ColorSubscriptionWhereInput[]
    | null /** Logical NOT on all given filters combined by AND. */;
  mutation_in?:
    | MutationType[]
    | null /** The subscription event gets dispatched when it's listed in mutation_in */;
  updatedFields_contains?:
    | string
    | null /** The subscription event gets only dispatched when one of the updated fields names is included in this list */;
  updatedFields_contains_every?:
    | string[]
    | null /** The subscription event gets only dispatched when all of the field names included in this list have been updated */;
  updatedFields_contains_some?:
    | string[]
    | null /** The subscription event gets only dispatched when some of the field names included in this list have been updated */;
  node?: ColorWhereInput | null;
}

export interface LocationSubscriptionWhereInput {
  AND?:
    | LocationSubscriptionWhereInput[]
    | null /** Logical AND on all given filters. */;
  OR?:
    | LocationSubscriptionWhereInput[]
    | null /** Logical OR on all given filters. */;
  NOT?:
    | LocationSubscriptionWhereInput[]
    | null /** Logical NOT on all given filters combined by AND. */;
  mutation_in?:
    | MutationType[]
    | null /** The subscription event gets dispatched when it's listed in mutation_in */;
  updatedFields_contains?:
    | string
    | null /** The subscription event gets only dispatched when one of the updated fields names is included in this list */;
  updatedFields_contains_every?:
    | string[]
    | null /** The subscription event gets only dispatched when all of the field names included in this list have been updated */;
  updatedFields_contains_some?:
    | string[]
    | null /** The subscription event gets only dispatched when some of the field names included in this list have been updated */;
  node?: LocationWhereInput | null;
}

export interface LanguageSubscriptionWhereInput {
  AND?:
    | LanguageSubscriptionWhereInput[]
    | null /** Logical AND on all given filters. */;
  OR?:
    | LanguageSubscriptionWhereInput[]
    | null /** Logical OR on all given filters. */;
  NOT?:
    | LanguageSubscriptionWhereInput[]
    | null /** Logical NOT on all given filters combined by AND. */;
  mutation_in?:
    | MutationType[]
    | null /** The subscription event gets dispatched when it's listed in mutation_in */;
  updatedFields_contains?:
    | string
    | null /** The subscription event gets only dispatched when one of the updated fields names is included in this list */;
  updatedFields_contains_every?:
    | string[]
    | null /** The subscription event gets only dispatched when all of the field names included in this list have been updated */;
  updatedFields_contains_some?:
    | string[]
    | null /** The subscription event gets only dispatched when some of the field names included in this list have been updated */;
  node?: LanguageWhereInput | null;
}

export interface KeySubscriptionWhereInput {
  AND?:
    | KeySubscriptionWhereInput[]
    | null /** Logical AND on all given filters. */;
  OR?:
    | KeySubscriptionWhereInput[]
    | null /** Logical OR on all given filters. */;
  NOT?:
    | KeySubscriptionWhereInput[]
    | null /** Logical NOT on all given filters combined by AND. */;
  mutation_in?:
    | MutationType[]
    | null /** The subscription event gets dispatched when it's listed in mutation_in */;
  updatedFields_contains?:
    | string
    | null /** The subscription event gets only dispatched when one of the updated fields names is included in this list */;
  updatedFields_contains_every?:
    | string[]
    | null /** The subscription event gets only dispatched when all of the field names included in this list have been updated */;
  updatedFields_contains_some?:
    | string[]
    | null /** The subscription event gets only dispatched when some of the field names included in this list have been updated */;
  node?: KeyWhereInput | null;
}

export interface TranslationSubscriptionWhereInput {
  AND?:
    | TranslationSubscriptionWhereInput[]
    | null /** Logical AND on all given filters. */;
  OR?:
    | TranslationSubscriptionWhereInput[]
    | null /** Logical OR on all given filters. */;
  NOT?:
    | TranslationSubscriptionWhereInput[]
    | null /** Logical NOT on all given filters combined by AND. */;
  mutation_in?:
    | MutationType[]
    | null /** The subscription event gets dispatched when it's listed in mutation_in */;
  updatedFields_contains?:
    | string
    | null /** The subscription event gets only dispatched when one of the updated fields names is included in this list */;
  updatedFields_contains_every?:
    | string[]
    | null /** The subscription event gets only dispatched when all of the field names included in this list have been updated */;
  updatedFields_contains_some?:
    | string[]
    | null /** The subscription event gets only dispatched when some of the field names included in this list have been updated */;
  node?: TranslationWhereInput | null;
}

export interface PerilSubscriptionWhereInput {
  AND?:
    | PerilSubscriptionWhereInput[]
    | null /** Logical AND on all given filters. */;
  OR?:
    | PerilSubscriptionWhereInput[]
    | null /** Logical OR on all given filters. */;
  NOT?:
    | PerilSubscriptionWhereInput[]
    | null /** Logical NOT on all given filters combined by AND. */;
  mutation_in?:
    | MutationType[]
    | null /** The subscription event gets dispatched when it's listed in mutation_in */;
  updatedFields_contains?:
    | string
    | null /** The subscription event gets only dispatched when one of the updated fields names is included in this list */;
  updatedFields_contains_every?:
    | string[]
    | null /** The subscription event gets only dispatched when all of the field names included in this list have been updated */;
  updatedFields_contains_some?:
    | string[]
    | null /** The subscription event gets only dispatched when some of the field names included in this list have been updated */;
  node?: PerilWhereInput | null;
}

export interface PerilCategorySubscriptionWhereInput {
  AND?:
    | PerilCategorySubscriptionWhereInput[]
    | null /** Logical AND on all given filters. */;
  OR?:
    | PerilCategorySubscriptionWhereInput[]
    | null /** Logical OR on all given filters. */;
  NOT?:
    | PerilCategorySubscriptionWhereInput[]
    | null /** Logical NOT on all given filters combined by AND. */;
  mutation_in?:
    | MutationType[]
    | null /** The subscription event gets dispatched when it's listed in mutation_in */;
  updatedFields_contains?:
    | string
    | null /** The subscription event gets only dispatched when one of the updated fields names is included in this list */;
  updatedFields_contains_every?:
    | string[]
    | null /** The subscription event gets only dispatched when all of the field names included in this list have been updated */;
  updatedFields_contains_some?:
    | string[]
    | null /** The subscription event gets only dispatched when some of the field names included in this list have been updated */;
  node?: PerilCategoryWhereInput | null;
}
export interface LanguagesQueryArgs {
  where?: LanguageWhereInput | null;
  orderBy?: LanguageOrderByInput | null;
  skip?: number | null;
  after?: string | null;
  before?: string | null;
  first?: number | null;
  last?: number | null;
}
export interface GifsQueryArgs {
  query: string;
}
export interface FileQueryArgs {
  key: string;
}
export interface TranslationsLanguageArgs {
  where?: TranslationWhereInput | null;
  orderBy?: TranslationOrderByInput | null;
  skip?: number | null;
  after?: string | null;
  before?: string | null;
  first?: number | null;
  last?: number | null;
}
export interface LanguageTranslationArgs {
  where?: LanguageWhereInput | null;
}
export interface KeyTranslationArgs {
  where?: KeyWhereInput | null;
}
export interface TranslationsKeyArgs {
  where?: TranslationWhereInput | null;
  orderBy?: TranslationOrderByInput | null;
  skip?: number | null;
  after?: string | null;
  before?: string | null;
  first?: number | null;
  last?: number | null;
}
export interface PerilCategoryTitleKeyArgs {
  where?: PerilCategoryWhereInput | null;
}
export interface PerilCategoryDescriptionKeyArgs {
  where?: PerilCategoryWhereInput | null;
}
export interface PerilTitleKeyArgs {
  where?: PerilWhereInput | null;
}
export interface PerilDescriptionKeyArgs {
  where?: PerilWhereInput | null;
}
export interface CreateOfferMutationArgs {
  details: OfferInput;
}
export interface SignOfferMutationArgs {
  details: SignInput;
}
export interface UploadFileMutationArgs {
  file: Upload;
}
export interface UrlAssetArgs {
  transformation?: AssetTransformationInput | null;
}

export enum Status {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
}

export enum Project {
  Web = 'Web',
  App = 'App',
  WebOnboarding = 'WebOnboarding',
  All = 'All',
}

export enum LanguageOrderByInput {
  status_ASC = 'status_ASC',
  status_DESC = 'status_DESC',
  id_ASC = 'id_ASC',
  id_DESC = 'id_DESC',
  createdAt_ASC = 'createdAt_ASC',
  createdAt_DESC = 'createdAt_DESC',
  updatedAt_ASC = 'updatedAt_ASC',
  updatedAt_DESC = 'updatedAt_DESC',
  code_ASC = 'code_ASC',
  code_DESC = 'code_DESC',
  name_ASC = 'name_ASC',
  name_DESC = 'name_DESC',
}

export enum TranslationOrderByInput {
  status_ASC = 'status_ASC',
  status_DESC = 'status_DESC',
  id_ASC = 'id_ASC',
  id_DESC = 'id_DESC',
  createdAt_ASC = 'createdAt_ASC',
  createdAt_DESC = 'createdAt_DESC',
  updatedAt_ASC = 'updatedAt_ASC',
  updatedAt_DESC = 'updatedAt_DESC',
  project_ASC = 'project_ASC',
  project_DESC = 'project_DESC',
  text_ASC = 'text_ASC',
  text_DESC = 'text_DESC',
}

export enum InsuranceStatus {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  INACTIVE_WITH_START_DATE = 'INACTIVE_WITH_START_DATE',
  TERMINATED = 'TERMINATED',
}

export enum InsuranceType {
  RENT = 'RENT',
  BRF = 'BRF',
  STUDENT_RENT = 'STUDENT_RENT',
  STUDENT_BRF = 'STUDENT_BRF',
}

export enum BankIdStatus {
  pending = 'pending',
  failed = 'failed',
  complete = 'complete',
}

export enum SignState {
  INITIATED = 'INITIATED',
  IN_PROGRESS = 'IN_PROGRESS',
  FAILED = 'FAILED',
  COMPLETED = 'COMPLETED',
}

export enum OfferStatus {
  SUCCESS = 'SUCCESS',
  FAIL = 'FAIL',
}

export enum PerilOrderByInput {
  status_ASC = 'status_ASC',
  status_DESC = 'status_DESC',
  id_ASC = 'id_ASC',
  id_DESC = 'id_DESC',
  createdAt_ASC = 'createdAt_ASC',
  createdAt_DESC = 'createdAt_DESC',
  updatedAt_ASC = 'updatedAt_ASC',
  updatedAt_DESC = 'updatedAt_DESC',
}

export enum AssetOrderByInput {
  status_ASC = 'status_ASC',
  status_DESC = 'status_DESC',
  id_ASC = 'id_ASC',
  id_DESC = 'id_DESC',
  createdAt_ASC = 'createdAt_ASC',
  createdAt_DESC = 'createdAt_DESC',
  updatedAt_ASC = 'updatedAt_ASC',
  updatedAt_DESC = 'updatedAt_DESC',
  handle_ASC = 'handle_ASC',
  handle_DESC = 'handle_DESC',
  fileName_ASC = 'fileName_ASC',
  fileName_DESC = 'fileName_DESC',
  height_ASC = 'height_ASC',
  height_DESC = 'height_DESC',
  mimeType_ASC = 'mimeType_ASC',
  mimeType_DESC = 'mimeType_DESC',
  size_ASC = 'size_ASC',
  size_DESC = 'size_DESC',
  width_ASC = 'width_ASC',
  width_DESC = 'width_DESC',
}

export enum ImageFit {
  clip = 'clip',
  crop = 'crop',
  scale = 'scale',
  max = 'max',
}

export enum DocumentFileTypes {
  jpg = 'jpg',
  odp = 'odp',
  ods = 'ods',
  odt = 'odt',
  png = 'png',
  svg = 'svg',
  txt = 'txt',
  webp = 'webp',
  docx = 'docx',
  html = 'html',
  pdf = 'pdf',
  doc = 'doc',
  xlsx = 'xlsx',
  xls = 'xls',
  pptx = 'pptx',
  ppt = 'ppt',
}

export enum ColorOrderByInput {
  id_ASC = 'id_ASC',
  id_DESC = 'id_DESC',
  createdAt_ASC = 'createdAt_ASC',
  createdAt_DESC = 'createdAt_DESC',
  updatedAt_ASC = 'updatedAt_ASC',
  updatedAt_DESC = 'updatedAt_DESC',
}

export enum LocationOrderByInput {
  id_ASC = 'id_ASC',
  id_DESC = 'id_DESC',
  createdAt_ASC = 'createdAt_ASC',
  createdAt_DESC = 'createdAt_DESC',
  updatedAt_ASC = 'updatedAt_ASC',
  updatedAt_DESC = 'updatedAt_DESC',
}

export enum KeyOrderByInput {
  status_ASC = 'status_ASC',
  status_DESC = 'status_DESC',
  id_ASC = 'id_ASC',
  id_DESC = 'id_DESC',
  createdAt_ASC = 'createdAt_ASC',
  createdAt_DESC = 'createdAt_DESC',
  updatedAt_ASC = 'updatedAt_ASC',
  updatedAt_DESC = 'updatedAt_DESC',
  value_ASC = 'value_ASC',
  value_DESC = 'value_DESC',
}

export enum PerilCategoryOrderByInput {
  status_ASC = 'status_ASC',
  status_DESC = 'status_DESC',
  id_ASC = 'id_ASC',
  id_DESC = 'id_DESC',
  createdAt_ASC = 'createdAt_ASC',
  createdAt_DESC = 'createdAt_DESC',
  updatedAt_ASC = 'updatedAt_ASC',
  updatedAt_DESC = 'updatedAt_DESC',
  name_ASC = 'name_ASC',
  name_DESC = 'name_DESC',
}

export enum MutationType {
  CREATED = 'CREATED',
  UPDATED = 'UPDATED',
  DELETED = 'DELETED',
}

export interface QueryResolvers<Context = any> {
  languages?: QueryLanguagesResolver<Language[], any, Context>;
  insurance?: QueryInsuranceResolver<Insurance, any, Context>;
  cashback?: QueryCashbackResolver<Cashback, any, Context>;
  signStatus?: QuerySignStatusResolver<SignStatus, any, Context>;
  member?: QueryMemberResolver<Member, any, Context>;
  gifs?: QueryGifsResolver<Gif[], any, Context>;
  file?: QueryFileResolver<File, any, Context>;
}

export type QueryLanguagesResolver<
  R = Language[],
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export interface QueryLanguagesArgs {
  where?: LanguageWhereInput | null;
  orderBy?: LanguageOrderByInput | null;
  skip?: number | null;
  after?: string | null;
  before?: string | null;
  first?: number | null;
  last?: number | null;
}

export type QueryInsuranceResolver<
  R = Insurance,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type QueryCashbackResolver<
  R = Cashback,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type QuerySignStatusResolver<
  R = SignStatus,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type QueryMemberResolver<
  R = Member,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type QueryGifsResolver<
  R = Gif[],
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export interface QueryGifsArgs {
  query: string;
}

export type QueryFileResolver<R = File, Parent = any, Context = any> = Resolver<
  R,
  Parent,
  Context
>;
export interface QueryFileArgs {
  key: string;
}

export interface LanguageResolvers<Context = any> {
  status?: LanguageStatusResolver<Status, any, Context>;
  id?: LanguageIdResolver<string, any, Context>;
  createdAt?: LanguageCreatedAtResolver<DateTime, any, Context>;
  updatedAt?: LanguageUpdatedAtResolver<DateTime, any, Context>;
  translations?: LanguageTranslationsResolver<
    Translation[] | null,
    any,
    Context
  >;
  code?: LanguageCodeResolver<string, any, Context>;
  name?: LanguageNameResolver<string, any, Context>;
}

export type LanguageStatusResolver<
  R = Status,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type LanguageIdResolver<
  R = string,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type LanguageCreatedAtResolver<
  R = DateTime,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type LanguageUpdatedAtResolver<
  R = DateTime,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type LanguageTranslationsResolver<
  R = Translation[] | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export interface LanguageTranslationsArgs {
  where?: TranslationWhereInput | null;
  orderBy?: TranslationOrderByInput | null;
  skip?: number | null;
  after?: string | null;
  before?: string | null;
  first?: number | null;
  last?: number | null;
}

export type LanguageCodeResolver<
  R = string,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type LanguageNameResolver<
  R = string,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;

export interface TranslationResolvers<Context = any> {
  status?: TranslationStatusResolver<Status, any, Context>;
  id?: TranslationIdResolver<string, any, Context>;
  createdAt?: TranslationCreatedAtResolver<DateTime, any, Context>;
  updatedAt?: TranslationUpdatedAtResolver<DateTime, any, Context>;
  language?: TranslationLanguageResolver<Language | null, any, Context>;
  project?: TranslationProjectResolver<Project | null, any, Context>;
  key?: TranslationKeyResolver<Key | null, any, Context>;
  text?: TranslationTextResolver<string, any, Context>;
}

export type TranslationStatusResolver<
  R = Status,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type TranslationIdResolver<
  R = string,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type TranslationCreatedAtResolver<
  R = DateTime,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type TranslationUpdatedAtResolver<
  R = DateTime,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type TranslationLanguageResolver<
  R = Language | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export interface TranslationLanguageArgs {
  where?: LanguageWhereInput | null;
}

export type TranslationProjectResolver<
  R = Project | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type TranslationKeyResolver<
  R = Key | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export interface TranslationKeyArgs {
  where?: KeyWhereInput | null;
}

export type TranslationTextResolver<
  R = string,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;

export interface KeyResolvers<Context = any> {
  status?: KeyStatusResolver<Status, any, Context>;
  id?: KeyIdResolver<string, any, Context>;
  createdAt?: KeyCreatedAtResolver<DateTime, any, Context>;
  updatedAt?: KeyUpdatedAtResolver<DateTime, any, Context>;
  value?: KeyValueResolver<string, any, Context>;
  translations?: KeyTranslationsResolver<Translation[] | null, any, Context>;
  perilCategoryTitle?: KeyPerilCategoryTitleResolver<
    PerilCategory | null,
    any,
    Context
  >;
  perilCategoryDescription?: KeyPerilCategoryDescriptionResolver<
    PerilCategory | null,
    any,
    Context
  >;
  perilTitle?: KeyPerilTitleResolver<Peril | null, any, Context>;
  perilDescription?: KeyPerilDescriptionResolver<Peril | null, any, Context>;
}

export type KeyStatusResolver<
  R = Status,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type KeyIdResolver<R = string, Parent = any, Context = any> = Resolver<
  R,
  Parent,
  Context
>;
export type KeyCreatedAtResolver<
  R = DateTime,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type KeyUpdatedAtResolver<
  R = DateTime,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type KeyValueResolver<
  R = string,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type KeyTranslationsResolver<
  R = Translation[] | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export interface KeyTranslationsArgs {
  where?: TranslationWhereInput | null;
  orderBy?: TranslationOrderByInput | null;
  skip?: number | null;
  after?: string | null;
  before?: string | null;
  first?: number | null;
  last?: number | null;
}

export type KeyPerilCategoryTitleResolver<
  R = PerilCategory | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export interface KeyPerilCategoryTitleArgs {
  where?: PerilCategoryWhereInput | null;
}

export type KeyPerilCategoryDescriptionResolver<
  R = PerilCategory | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export interface KeyPerilCategoryDescriptionArgs {
  where?: PerilCategoryWhereInput | null;
}

export type KeyPerilTitleResolver<
  R = Peril | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export interface KeyPerilTitleArgs {
  where?: PerilWhereInput | null;
}

export type KeyPerilDescriptionResolver<
  R = Peril | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export interface KeyPerilDescriptionArgs {
  where?: PerilWhereInput | null;
}

export interface PerilCategoryResolvers<Context = any> {
  title?: PerilCategoryTitleResolver<string | null, any, Context>;
  description?: PerilCategoryDescriptionResolver<string | null, any, Context>;
  iconUrl?: PerilCategoryIconUrlResolver<string | null, any, Context>;
  perils?: PerilCategoryPerilsResolver<Peril[] | null, any, Context>;
}

export type PerilCategoryTitleResolver<
  R = string | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type PerilCategoryDescriptionResolver<
  R = string | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type PerilCategoryIconUrlResolver<
  R = string | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type PerilCategoryPerilsResolver<
  R = Peril[] | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;

export interface PerilResolvers<Context = any> {
  id?: PerilIdResolver<string | null, any, Context>;
  title?: PerilTitleResolver<string | null, any, Context>;
  imageUrl?: PerilImageUrlResolver<string | null, any, Context>;
  description?: PerilDescriptionResolver<string | null, any, Context>;
}

export type PerilIdResolver<
  R = string | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type PerilTitleResolver<
  R = string | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type PerilImageUrlResolver<
  R = string | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type PerilDescriptionResolver<
  R = string | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;

export interface InsuranceResolvers<Context = any> {
  address?: InsuranceAddressResolver<string | null, any, Context>;
  postalNumber?: InsurancePostalNumberResolver<string | null, any, Context>;
  monthlyCost?: InsuranceMonthlyCostResolver<number | null, any, Context>;
  safetyIncreasers?: InsuranceSafetyIncreasersResolver<
    string[] | null,
    any,
    Context
  >;
  personsInHousehold?: InsurancePersonsInHouseholdResolver<
    number | null,
    any,
    Context
  >;
  certificateUrl?: InsuranceCertificateUrlResolver<string | null, any, Context>;
  status?: InsuranceStatusResolver<InsuranceStatus, any, Context>;
  type?: InsuranceTypeResolver<InsuranceType | null, any, Context>;
  activeFrom?: InsuranceActiveFromResolver<LocalDate | null, any, Context>;
  insuredAtOtherCompany?: InsuranceInsuredAtOtherCompanyResolver<
    boolean | null,
    any,
    Context
  >;
  presaleInformationUrl?: InsurancePresaleInformationUrlResolver<
    string | null,
    any,
    Context
  >;
  policyUrl?: InsurancePolicyUrlResolver<string | null, any, Context>;
  currentInsurerName?: InsuranceCurrentInsurerNameResolver<
    string | null,
    any,
    Context
  >;
  perilCategories?: InsurancePerilCategoriesResolver<
    PerilCategory[] | null,
    any,
    Context
  >;
}

export type InsuranceAddressResolver<
  R = string | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type InsurancePostalNumberResolver<
  R = string | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type InsuranceMonthlyCostResolver<
  R = number | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type InsuranceSafetyIncreasersResolver<
  R = string[] | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type InsurancePersonsInHouseholdResolver<
  R = number | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type InsuranceCertificateUrlResolver<
  R = string | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type InsuranceStatusResolver<
  R = InsuranceStatus,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type InsuranceTypeResolver<
  R = InsuranceType | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type InsuranceActiveFromResolver<
  R = LocalDate | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type InsuranceInsuredAtOtherCompanyResolver<
  R = boolean | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type InsurancePresaleInformationUrlResolver<
  R = string | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type InsurancePolicyUrlResolver<
  R = string | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type InsuranceCurrentInsurerNameResolver<
  R = string | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type InsurancePerilCategoriesResolver<
  R = PerilCategory[] | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;

export interface CashbackResolvers<Context = any> {
  id?: CashbackIdResolver<string | null, any, Context>;
  name?: CashbackNameResolver<string | null, any, Context>;
  imageUrl?: CashbackImageUrlResolver<string | null, any, Context>;
}

export type CashbackIdResolver<
  R = string | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type CashbackNameResolver<
  R = string | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type CashbackImageUrlResolver<
  R = string | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;

export interface SignStatusResolvers<Context = any> {
  collectStatus?: SignStatusCollectStatusResolver<
    CollectStatus | null,
    any,
    Context
  >;
  signState?: SignStatusSignStateResolver<SignState | null, any, Context>;
}

export type SignStatusCollectStatusResolver<
  R = CollectStatus | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type SignStatusSignStateResolver<
  R = SignState | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;

export interface CollectStatusResolvers<Context = any> {
  status?: CollectStatusStatusResolver<BankIdStatus | null, any, Context>;
  code?: CollectStatusCodeResolver<string | null, any, Context>;
}

export type CollectStatusStatusResolver<
  R = BankIdStatus | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type CollectStatusCodeResolver<
  R = string | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;

export interface MemberResolvers<Context = any> {
  firstName?: MemberFirstNameResolver<string | null, any, Context>;
  lastName?: MemberLastNameResolver<string | null, any, Context>;
}

export type MemberFirstNameResolver<
  R = string | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type MemberLastNameResolver<
  R = string | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;

export interface GifResolvers<Context = any> {
  url?: GifUrlResolver<string | null, any, Context>;
}

export type GifUrlResolver<
  R = string | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;

export interface FileResolvers<Context = any> {
  signedUrl?: FileSignedUrlResolver<
    string,
    any,
    Context
  > /** signedUrl is valid for 30 minutes after upload, don't hang on to this. */;
  key?: FileKeyResolver<
    string,
    any,
    Context
  > /** S3 key that can be used to retreive new signed urls in the future. */;
}

export type FileSignedUrlResolver<
  R = string,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type FileKeyResolver<R = string, Parent = any, Context = any> = Resolver<
  R,
  Parent,
  Context
>;

export interface MutationResolvers<Context = any> {
  logout?: MutationLogoutResolver<boolean, any, Context>;
  createSession?: MutationCreateSessionResolver<string, any, Context>;
  createOffer?: MutationCreateOfferResolver<boolean | null, any, Context>;
  signOffer?: MutationSignOfferResolver<boolean | null, any, Context>;
  uploadFile?: MutationUploadFileResolver<File, any, Context>;
}

export type MutationLogoutResolver<
  R = boolean,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type MutationCreateSessionResolver<
  R = string,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type MutationCreateOfferResolver<
  R = boolean | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export interface MutationCreateOfferArgs {
  details: OfferInput;
}

export type MutationSignOfferResolver<
  R = boolean | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export interface MutationSignOfferArgs {
  details: SignInput;
}

export type MutationUploadFileResolver<
  R = File,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export interface MutationUploadFileArgs {
  file: Upload;
}

export interface SubscriptionResolvers<Context = any> {
  offer?: SubscriptionOfferResolver<OfferEvent | null, any, Context>;
  signStatus?: SubscriptionSignStatusResolver<SignEvent | null, any, Context>;
}

export type SubscriptionOfferResolver<
  R = OfferEvent | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type SubscriptionSignStatusResolver<
  R = SignEvent | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;

export interface OfferEventResolvers<Context = any> {
  status?: OfferEventStatusResolver<OfferStatus, any, Context>;
  insurance?: OfferEventInsuranceResolver<Insurance | null, any, Context>;
}

export type OfferEventStatusResolver<
  R = OfferStatus,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type OfferEventInsuranceResolver<
  R = Insurance | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;

export interface SignEventResolvers<Context = any> {
  status?: SignEventStatusResolver<SignStatus | null, any, Context>;
}

export type SignEventStatusResolver<
  R = SignStatus | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;

export interface AssetResolvers<Context = any> {
  status?: AssetStatusResolver<Status, any, Context>;
  id?: AssetIdResolver<string, any, Context>;
  createdAt?: AssetCreatedAtResolver<DateTime, any, Context>;
  updatedAt?: AssetUpdatedAtResolver<DateTime, any, Context>;
  handle?: AssetHandleResolver<string, any, Context>;
  fileName?: AssetFileNameResolver<string, any, Context>;
  height?: AssetHeightResolver<number | null, any, Context>;
  mimeType?: AssetMimeTypeResolver<string | null, any, Context>;
  size?: AssetSizeResolver<number | null, any, Context>;
  width?: AssetWidthResolver<number | null, any, Context>;
  url?: AssetUrlResolver<
    string,
    any,
    Context
  > /** Get the url for the asset with provided transformations applied. */;
}

export type AssetStatusResolver<
  R = Status,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type AssetIdResolver<R = string, Parent = any, Context = any> = Resolver<
  R,
  Parent,
  Context
>;
export type AssetCreatedAtResolver<
  R = DateTime,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type AssetUpdatedAtResolver<
  R = DateTime,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type AssetHandleResolver<
  R = string,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type AssetFileNameResolver<
  R = string,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type AssetHeightResolver<
  R = number | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type AssetMimeTypeResolver<
  R = string | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type AssetSizeResolver<
  R = number | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type AssetWidthResolver<
  R = number | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type AssetUrlResolver<
  R = string,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export interface AssetUrlArgs {
  transformation?: AssetTransformationInput | null;
}

export interface ColorResolvers<Context = any> {
  id?: ColorIdResolver<string, any, Context>;
  createdAt?: ColorCreatedAtResolver<DateTime, any, Context>;
  updatedAt?: ColorUpdatedAtResolver<DateTime, any, Context>;
}

export type ColorIdResolver<R = string, Parent = any, Context = any> = Resolver<
  R,
  Parent,
  Context
>;
export type ColorCreatedAtResolver<
  R = DateTime,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type ColorUpdatedAtResolver<
  R = DateTime,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;

export interface LocationResolvers<Context = any> {
  id?: LocationIdResolver<string, any, Context>;
  createdAt?: LocationCreatedAtResolver<DateTime, any, Context>;
  updatedAt?: LocationUpdatedAtResolver<DateTime, any, Context>;
}

export type LocationIdResolver<
  R = string,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type LocationCreatedAtResolver<
  R = DateTime,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type LocationUpdatedAtResolver<
  R = DateTime,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
/** A connection to a list of items. */
export interface AssetConnectionResolvers<Context = any> {
  pageInfo?: AssetConnectionPageInfoResolver<
    PageInfo,
    any,
    Context
  > /** Information to aid in pagination. */;
  edges?: AssetConnectionEdgesResolver<
    AssetEdge[],
    any,
    Context
  > /** A list of edges. */;
  aggregate?: AssetConnectionAggregateResolver<AggregateAsset, any, Context>;
}

export type AssetConnectionPageInfoResolver<
  R = PageInfo,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type AssetConnectionEdgesResolver<
  R = AssetEdge[],
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type AssetConnectionAggregateResolver<
  R = AggregateAsset,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
/** Information about pagination in a connection. */
export interface PageInfoResolvers<Context = any> {
  hasNextPage?: PageInfoHasNextPageResolver<
    boolean,
    any,
    Context
  > /** When paginating forwards, are there more items? */;
  hasPreviousPage?: PageInfoHasPreviousPageResolver<
    boolean,
    any,
    Context
  > /** When paginating backwards, are there more items? */;
  startCursor?: PageInfoStartCursorResolver<
    string | null,
    any,
    Context
  > /** When paginating backwards, the cursor to continue. */;
  endCursor?: PageInfoEndCursorResolver<
    string | null,
    any,
    Context
  > /** When paginating forwards, the cursor to continue. */;
}

export type PageInfoHasNextPageResolver<
  R = boolean,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type PageInfoHasPreviousPageResolver<
  R = boolean,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type PageInfoStartCursorResolver<
  R = string | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type PageInfoEndCursorResolver<
  R = string | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
/** An edge in a connection. */
export interface AssetEdgeResolvers<Context = any> {
  node?: AssetEdgeNodeResolver<
    Asset,
    any,
    Context
  > /** The item at the end of the edge. */;
  cursor?: AssetEdgeCursorResolver<
    string,
    any,
    Context
  > /** A cursor for use in pagination. */;
}

export type AssetEdgeNodeResolver<
  R = Asset,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type AssetEdgeCursorResolver<
  R = string,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;

export interface AggregateAssetResolvers<Context = any> {
  count?: AggregateAssetCountResolver<number, any, Context>;
}

export type AggregateAssetCountResolver<
  R = number,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
/** A connection to a list of items. */
export interface ColorConnectionResolvers<Context = any> {
  pageInfo?: ColorConnectionPageInfoResolver<
    PageInfo,
    any,
    Context
  > /** Information to aid in pagination. */;
  edges?: ColorConnectionEdgesResolver<
    ColorEdge[],
    any,
    Context
  > /** A list of edges. */;
  aggregate?: ColorConnectionAggregateResolver<AggregateColor, any, Context>;
}

export type ColorConnectionPageInfoResolver<
  R = PageInfo,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type ColorConnectionEdgesResolver<
  R = ColorEdge[],
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type ColorConnectionAggregateResolver<
  R = AggregateColor,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
/** An edge in a connection. */
export interface ColorEdgeResolvers<Context = any> {
  node?: ColorEdgeNodeResolver<
    Color,
    any,
    Context
  > /** The item at the end of the edge. */;
  cursor?: ColorEdgeCursorResolver<
    string,
    any,
    Context
  > /** A cursor for use in pagination. */;
}

export type ColorEdgeNodeResolver<
  R = Color,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type ColorEdgeCursorResolver<
  R = string,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;

export interface AggregateColorResolvers<Context = any> {
  count?: AggregateColorCountResolver<number, any, Context>;
}

export type AggregateColorCountResolver<
  R = number,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
/** A connection to a list of items. */
export interface LocationConnectionResolvers<Context = any> {
  pageInfo?: LocationConnectionPageInfoResolver<
    PageInfo,
    any,
    Context
  > /** Information to aid in pagination. */;
  edges?: LocationConnectionEdgesResolver<
    LocationEdge[],
    any,
    Context
  > /** A list of edges. */;
  aggregate?: LocationConnectionAggregateResolver<
    AggregateLocation,
    any,
    Context
  >;
}

export type LocationConnectionPageInfoResolver<
  R = PageInfo,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type LocationConnectionEdgesResolver<
  R = LocationEdge[],
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type LocationConnectionAggregateResolver<
  R = AggregateLocation,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
/** An edge in a connection. */
export interface LocationEdgeResolvers<Context = any> {
  node?: LocationEdgeNodeResolver<
    Location,
    any,
    Context
  > /** The item at the end of the edge. */;
  cursor?: LocationEdgeCursorResolver<
    string,
    any,
    Context
  > /** A cursor for use in pagination. */;
}

export type LocationEdgeNodeResolver<
  R = Location,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type LocationEdgeCursorResolver<
  R = string,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;

export interface AggregateLocationResolvers<Context = any> {
  count?: AggregateLocationCountResolver<number, any, Context>;
}

export type AggregateLocationCountResolver<
  R = number,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
/** A connection to a list of items. */
export interface LanguageConnectionResolvers<Context = any> {
  pageInfo?: LanguageConnectionPageInfoResolver<
    PageInfo,
    any,
    Context
  > /** Information to aid in pagination. */;
  edges?: LanguageConnectionEdgesResolver<
    LanguageEdge[],
    any,
    Context
  > /** A list of edges. */;
  aggregate?: LanguageConnectionAggregateResolver<
    AggregateLanguage,
    any,
    Context
  >;
}

export type LanguageConnectionPageInfoResolver<
  R = PageInfo,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type LanguageConnectionEdgesResolver<
  R = LanguageEdge[],
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type LanguageConnectionAggregateResolver<
  R = AggregateLanguage,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
/** An edge in a connection. */
export interface LanguageEdgeResolvers<Context = any> {
  node?: LanguageEdgeNodeResolver<
    Language,
    any,
    Context
  > /** The item at the end of the edge. */;
  cursor?: LanguageEdgeCursorResolver<
    string,
    any,
    Context
  > /** A cursor for use in pagination. */;
}

export type LanguageEdgeNodeResolver<
  R = Language,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type LanguageEdgeCursorResolver<
  R = string,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;

export interface AggregateLanguageResolvers<Context = any> {
  count?: AggregateLanguageCountResolver<number, any, Context>;
}

export type AggregateLanguageCountResolver<
  R = number,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
/** A connection to a list of items. */
export interface KeyConnectionResolvers<Context = any> {
  pageInfo?: KeyConnectionPageInfoResolver<
    PageInfo,
    any,
    Context
  > /** Information to aid in pagination. */;
  edges?: KeyConnectionEdgesResolver<
    KeyEdge[],
    any,
    Context
  > /** A list of edges. */;
  aggregate?: KeyConnectionAggregateResolver<AggregateKey, any, Context>;
}

export type KeyConnectionPageInfoResolver<
  R = PageInfo,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type KeyConnectionEdgesResolver<
  R = KeyEdge[],
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type KeyConnectionAggregateResolver<
  R = AggregateKey,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
/** An edge in a connection. */
export interface KeyEdgeResolvers<Context = any> {
  node?: KeyEdgeNodeResolver<
    Key,
    any,
    Context
  > /** The item at the end of the edge. */;
  cursor?: KeyEdgeCursorResolver<
    string,
    any,
    Context
  > /** A cursor for use in pagination. */;
}

export type KeyEdgeNodeResolver<
  R = Key,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type KeyEdgeCursorResolver<
  R = string,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;

export interface AggregateKeyResolvers<Context = any> {
  count?: AggregateKeyCountResolver<number, any, Context>;
}

export type AggregateKeyCountResolver<
  R = number,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
/** A connection to a list of items. */
export interface TranslationConnectionResolvers<Context = any> {
  pageInfo?: TranslationConnectionPageInfoResolver<
    PageInfo,
    any,
    Context
  > /** Information to aid in pagination. */;
  edges?: TranslationConnectionEdgesResolver<
    TranslationEdge[],
    any,
    Context
  > /** A list of edges. */;
  aggregate?: TranslationConnectionAggregateResolver<
    AggregateTranslation,
    any,
    Context
  >;
}

export type TranslationConnectionPageInfoResolver<
  R = PageInfo,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type TranslationConnectionEdgesResolver<
  R = TranslationEdge[],
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type TranslationConnectionAggregateResolver<
  R = AggregateTranslation,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
/** An edge in a connection. */
export interface TranslationEdgeResolvers<Context = any> {
  node?: TranslationEdgeNodeResolver<
    Translation,
    any,
    Context
  > /** The item at the end of the edge. */;
  cursor?: TranslationEdgeCursorResolver<
    string,
    any,
    Context
  > /** A cursor for use in pagination. */;
}

export type TranslationEdgeNodeResolver<
  R = Translation,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type TranslationEdgeCursorResolver<
  R = string,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;

export interface AggregateTranslationResolvers<Context = any> {
  count?: AggregateTranslationCountResolver<number, any, Context>;
}

export type AggregateTranslationCountResolver<
  R = number,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
/** A connection to a list of items. */
export interface PerilConnectionResolvers<Context = any> {
  pageInfo?: PerilConnectionPageInfoResolver<
    PageInfo,
    any,
    Context
  > /** Information to aid in pagination. */;
  edges?: PerilConnectionEdgesResolver<
    PerilEdge[],
    any,
    Context
  > /** A list of edges. */;
  aggregate?: PerilConnectionAggregateResolver<AggregatePeril, any, Context>;
}

export type PerilConnectionPageInfoResolver<
  R = PageInfo,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type PerilConnectionEdgesResolver<
  R = PerilEdge[],
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type PerilConnectionAggregateResolver<
  R = AggregatePeril,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
/** An edge in a connection. */
export interface PerilEdgeResolvers<Context = any> {
  node?: PerilEdgeNodeResolver<
    Peril,
    any,
    Context
  > /** The item at the end of the edge. */;
  cursor?: PerilEdgeCursorResolver<
    string,
    any,
    Context
  > /** A cursor for use in pagination. */;
}

export type PerilEdgeNodeResolver<
  R = Peril,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type PerilEdgeCursorResolver<
  R = string,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;

export interface AggregatePerilResolvers<Context = any> {
  count?: AggregatePerilCountResolver<number, any, Context>;
}

export type AggregatePerilCountResolver<
  R = number,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
/** A connection to a list of items. */
export interface PerilCategoryConnectionResolvers<Context = any> {
  pageInfo?: PerilCategoryConnectionPageInfoResolver<
    PageInfo,
    any,
    Context
  > /** Information to aid in pagination. */;
  edges?: PerilCategoryConnectionEdgesResolver<
    PerilCategoryEdge[],
    any,
    Context
  > /** A list of edges. */;
  aggregate?: PerilCategoryConnectionAggregateResolver<
    AggregatePerilCategory,
    any,
    Context
  >;
}

export type PerilCategoryConnectionPageInfoResolver<
  R = PageInfo,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type PerilCategoryConnectionEdgesResolver<
  R = PerilCategoryEdge[],
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type PerilCategoryConnectionAggregateResolver<
  R = AggregatePerilCategory,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
/** An edge in a connection. */
export interface PerilCategoryEdgeResolvers<Context = any> {
  node?: PerilCategoryEdgeNodeResolver<
    PerilCategory,
    any,
    Context
  > /** The item at the end of the edge. */;
  cursor?: PerilCategoryEdgeCursorResolver<
    string,
    any,
    Context
  > /** A cursor for use in pagination. */;
}

export type PerilCategoryEdgeNodeResolver<
  R = PerilCategory,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type PerilCategoryEdgeCursorResolver<
  R = string,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;

export interface AggregatePerilCategoryResolvers<Context = any> {
  count?: AggregatePerilCategoryCountResolver<number, any, Context>;
}

export type AggregatePerilCategoryCountResolver<
  R = number,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;

export interface BatchPayloadResolvers<Context = any> {
  count?: BatchPayloadCountResolver<
    Long,
    any,
    Context
  > /** The number of nodes that have been affected by the Batch operation. */;
}

export type BatchPayloadCountResolver<
  R = Long,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;

export interface AssetSubscriptionPayloadResolvers<Context = any> {
  mutation?: AssetSubscriptionPayloadMutationResolver<
    MutationType,
    any,
    Context
  >;
  node?: AssetSubscriptionPayloadNodeResolver<Asset | null, any, Context>;
  updatedFields?: AssetSubscriptionPayloadUpdatedFieldsResolver<
    string[] | null,
    any,
    Context
  >;
  previousValues?: AssetSubscriptionPayloadPreviousValuesResolver<
    AssetPreviousValues | null,
    any,
    Context
  >;
}

export type AssetSubscriptionPayloadMutationResolver<
  R = MutationType,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type AssetSubscriptionPayloadNodeResolver<
  R = Asset | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type AssetSubscriptionPayloadUpdatedFieldsResolver<
  R = string[] | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type AssetSubscriptionPayloadPreviousValuesResolver<
  R = AssetPreviousValues | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;

export interface AssetPreviousValuesResolvers<Context = any> {
  status?: AssetPreviousValuesStatusResolver<Status, any, Context>;
  id?: AssetPreviousValuesIdResolver<string, any, Context>;
  createdAt?: AssetPreviousValuesCreatedAtResolver<DateTime, any, Context>;
  updatedAt?: AssetPreviousValuesUpdatedAtResolver<DateTime, any, Context>;
  handle?: AssetPreviousValuesHandleResolver<string, any, Context>;
  fileName?: AssetPreviousValuesFileNameResolver<string, any, Context>;
  height?: AssetPreviousValuesHeightResolver<number | null, any, Context>;
  mimeType?: AssetPreviousValuesMimeTypeResolver<string | null, any, Context>;
  size?: AssetPreviousValuesSizeResolver<number | null, any, Context>;
  width?: AssetPreviousValuesWidthResolver<number | null, any, Context>;
}

export type AssetPreviousValuesStatusResolver<
  R = Status,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type AssetPreviousValuesIdResolver<
  R = string,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type AssetPreviousValuesCreatedAtResolver<
  R = DateTime,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type AssetPreviousValuesUpdatedAtResolver<
  R = DateTime,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type AssetPreviousValuesHandleResolver<
  R = string,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type AssetPreviousValuesFileNameResolver<
  R = string,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type AssetPreviousValuesHeightResolver<
  R = number | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type AssetPreviousValuesMimeTypeResolver<
  R = string | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type AssetPreviousValuesSizeResolver<
  R = number | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type AssetPreviousValuesWidthResolver<
  R = number | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;

export interface ColorSubscriptionPayloadResolvers<Context = any> {
  mutation?: ColorSubscriptionPayloadMutationResolver<
    MutationType,
    any,
    Context
  >;
  node?: ColorSubscriptionPayloadNodeResolver<Color | null, any, Context>;
  updatedFields?: ColorSubscriptionPayloadUpdatedFieldsResolver<
    string[] | null,
    any,
    Context
  >;
  previousValues?: ColorSubscriptionPayloadPreviousValuesResolver<
    ColorPreviousValues | null,
    any,
    Context
  >;
}

export type ColorSubscriptionPayloadMutationResolver<
  R = MutationType,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type ColorSubscriptionPayloadNodeResolver<
  R = Color | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type ColorSubscriptionPayloadUpdatedFieldsResolver<
  R = string[] | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type ColorSubscriptionPayloadPreviousValuesResolver<
  R = ColorPreviousValues | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;

export interface ColorPreviousValuesResolvers<Context = any> {
  id?: ColorPreviousValuesIdResolver<string, any, Context>;
  createdAt?: ColorPreviousValuesCreatedAtResolver<DateTime, any, Context>;
  updatedAt?: ColorPreviousValuesUpdatedAtResolver<DateTime, any, Context>;
}

export type ColorPreviousValuesIdResolver<
  R = string,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type ColorPreviousValuesCreatedAtResolver<
  R = DateTime,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type ColorPreviousValuesUpdatedAtResolver<
  R = DateTime,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;

export interface LocationSubscriptionPayloadResolvers<Context = any> {
  mutation?: LocationSubscriptionPayloadMutationResolver<
    MutationType,
    any,
    Context
  >;
  node?: LocationSubscriptionPayloadNodeResolver<Location | null, any, Context>;
  updatedFields?: LocationSubscriptionPayloadUpdatedFieldsResolver<
    string[] | null,
    any,
    Context
  >;
  previousValues?: LocationSubscriptionPayloadPreviousValuesResolver<
    LocationPreviousValues | null,
    any,
    Context
  >;
}

export type LocationSubscriptionPayloadMutationResolver<
  R = MutationType,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type LocationSubscriptionPayloadNodeResolver<
  R = Location | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type LocationSubscriptionPayloadUpdatedFieldsResolver<
  R = string[] | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type LocationSubscriptionPayloadPreviousValuesResolver<
  R = LocationPreviousValues | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;

export interface LocationPreviousValuesResolvers<Context = any> {
  id?: LocationPreviousValuesIdResolver<string, any, Context>;
  createdAt?: LocationPreviousValuesCreatedAtResolver<DateTime, any, Context>;
  updatedAt?: LocationPreviousValuesUpdatedAtResolver<DateTime, any, Context>;
}

export type LocationPreviousValuesIdResolver<
  R = string,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type LocationPreviousValuesCreatedAtResolver<
  R = DateTime,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type LocationPreviousValuesUpdatedAtResolver<
  R = DateTime,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;

export interface LanguageSubscriptionPayloadResolvers<Context = any> {
  mutation?: LanguageSubscriptionPayloadMutationResolver<
    MutationType,
    any,
    Context
  >;
  node?: LanguageSubscriptionPayloadNodeResolver<Language | null, any, Context>;
  updatedFields?: LanguageSubscriptionPayloadUpdatedFieldsResolver<
    string[] | null,
    any,
    Context
  >;
  previousValues?: LanguageSubscriptionPayloadPreviousValuesResolver<
    LanguagePreviousValues | null,
    any,
    Context
  >;
}

export type LanguageSubscriptionPayloadMutationResolver<
  R = MutationType,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type LanguageSubscriptionPayloadNodeResolver<
  R = Language | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type LanguageSubscriptionPayloadUpdatedFieldsResolver<
  R = string[] | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type LanguageSubscriptionPayloadPreviousValuesResolver<
  R = LanguagePreviousValues | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;

export interface LanguagePreviousValuesResolvers<Context = any> {
  status?: LanguagePreviousValuesStatusResolver<Status, any, Context>;
  id?: LanguagePreviousValuesIdResolver<string, any, Context>;
  createdAt?: LanguagePreviousValuesCreatedAtResolver<DateTime, any, Context>;
  updatedAt?: LanguagePreviousValuesUpdatedAtResolver<DateTime, any, Context>;
  code?: LanguagePreviousValuesCodeResolver<string, any, Context>;
  name?: LanguagePreviousValuesNameResolver<string, any, Context>;
}

export type LanguagePreviousValuesStatusResolver<
  R = Status,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type LanguagePreviousValuesIdResolver<
  R = string,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type LanguagePreviousValuesCreatedAtResolver<
  R = DateTime,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type LanguagePreviousValuesUpdatedAtResolver<
  R = DateTime,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type LanguagePreviousValuesCodeResolver<
  R = string,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type LanguagePreviousValuesNameResolver<
  R = string,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;

export interface KeySubscriptionPayloadResolvers<Context = any> {
  mutation?: KeySubscriptionPayloadMutationResolver<MutationType, any, Context>;
  node?: KeySubscriptionPayloadNodeResolver<Key | null, any, Context>;
  updatedFields?: KeySubscriptionPayloadUpdatedFieldsResolver<
    string[] | null,
    any,
    Context
  >;
  previousValues?: KeySubscriptionPayloadPreviousValuesResolver<
    KeyPreviousValues | null,
    any,
    Context
  >;
}

export type KeySubscriptionPayloadMutationResolver<
  R = MutationType,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type KeySubscriptionPayloadNodeResolver<
  R = Key | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type KeySubscriptionPayloadUpdatedFieldsResolver<
  R = string[] | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type KeySubscriptionPayloadPreviousValuesResolver<
  R = KeyPreviousValues | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;

export interface KeyPreviousValuesResolvers<Context = any> {
  status?: KeyPreviousValuesStatusResolver<Status, any, Context>;
  id?: KeyPreviousValuesIdResolver<string, any, Context>;
  createdAt?: KeyPreviousValuesCreatedAtResolver<DateTime, any, Context>;
  updatedAt?: KeyPreviousValuesUpdatedAtResolver<DateTime, any, Context>;
  value?: KeyPreviousValuesValueResolver<string, any, Context>;
}

export type KeyPreviousValuesStatusResolver<
  R = Status,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type KeyPreviousValuesIdResolver<
  R = string,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type KeyPreviousValuesCreatedAtResolver<
  R = DateTime,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type KeyPreviousValuesUpdatedAtResolver<
  R = DateTime,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type KeyPreviousValuesValueResolver<
  R = string,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;

export interface TranslationSubscriptionPayloadResolvers<Context = any> {
  mutation?: TranslationSubscriptionPayloadMutationResolver<
    MutationType,
    any,
    Context
  >;
  node?: TranslationSubscriptionPayloadNodeResolver<
    Translation | null,
    any,
    Context
  >;
  updatedFields?: TranslationSubscriptionPayloadUpdatedFieldsResolver<
    string[] | null,
    any,
    Context
  >;
  previousValues?: TranslationSubscriptionPayloadPreviousValuesResolver<
    TranslationPreviousValues | null,
    any,
    Context
  >;
}

export type TranslationSubscriptionPayloadMutationResolver<
  R = MutationType,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type TranslationSubscriptionPayloadNodeResolver<
  R = Translation | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type TranslationSubscriptionPayloadUpdatedFieldsResolver<
  R = string[] | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type TranslationSubscriptionPayloadPreviousValuesResolver<
  R = TranslationPreviousValues | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;

export interface TranslationPreviousValuesResolvers<Context = any> {
  status?: TranslationPreviousValuesStatusResolver<Status, any, Context>;
  id?: TranslationPreviousValuesIdResolver<string, any, Context>;
  createdAt?: TranslationPreviousValuesCreatedAtResolver<
    DateTime,
    any,
    Context
  >;
  updatedAt?: TranslationPreviousValuesUpdatedAtResolver<
    DateTime,
    any,
    Context
  >;
  project?: TranslationPreviousValuesProjectResolver<
    Project | null,
    any,
    Context
  >;
  text?: TranslationPreviousValuesTextResolver<string, any, Context>;
}

export type TranslationPreviousValuesStatusResolver<
  R = Status,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type TranslationPreviousValuesIdResolver<
  R = string,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type TranslationPreviousValuesCreatedAtResolver<
  R = DateTime,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type TranslationPreviousValuesUpdatedAtResolver<
  R = DateTime,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type TranslationPreviousValuesProjectResolver<
  R = Project | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type TranslationPreviousValuesTextResolver<
  R = string,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;

export interface PerilSubscriptionPayloadResolvers<Context = any> {
  mutation?: PerilSubscriptionPayloadMutationResolver<
    MutationType,
    any,
    Context
  >;
  node?: PerilSubscriptionPayloadNodeResolver<Peril | null, any, Context>;
  updatedFields?: PerilSubscriptionPayloadUpdatedFieldsResolver<
    string[] | null,
    any,
    Context
  >;
  previousValues?: PerilSubscriptionPayloadPreviousValuesResolver<
    PerilPreviousValues | null,
    any,
    Context
  >;
}

export type PerilSubscriptionPayloadMutationResolver<
  R = MutationType,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type PerilSubscriptionPayloadNodeResolver<
  R = Peril | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type PerilSubscriptionPayloadUpdatedFieldsResolver<
  R = string[] | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type PerilSubscriptionPayloadPreviousValuesResolver<
  R = PerilPreviousValues | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;

export interface PerilPreviousValuesResolvers<Context = any> {
  status?: PerilPreviousValuesStatusResolver<Status, any, Context>;
  id?: PerilPreviousValuesIdResolver<string, any, Context>;
  createdAt?: PerilPreviousValuesCreatedAtResolver<DateTime, any, Context>;
  updatedAt?: PerilPreviousValuesUpdatedAtResolver<DateTime, any, Context>;
}

export type PerilPreviousValuesStatusResolver<
  R = Status,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type PerilPreviousValuesIdResolver<
  R = string,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type PerilPreviousValuesCreatedAtResolver<
  R = DateTime,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type PerilPreviousValuesUpdatedAtResolver<
  R = DateTime,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;

export interface PerilCategorySubscriptionPayloadResolvers<Context = any> {
  mutation?: PerilCategorySubscriptionPayloadMutationResolver<
    MutationType,
    any,
    Context
  >;
  node?: PerilCategorySubscriptionPayloadNodeResolver<
    PerilCategory | null,
    any,
    Context
  >;
  updatedFields?: PerilCategorySubscriptionPayloadUpdatedFieldsResolver<
    string[] | null,
    any,
    Context
  >;
  previousValues?: PerilCategorySubscriptionPayloadPreviousValuesResolver<
    PerilCategoryPreviousValues | null,
    any,
    Context
  >;
}

export type PerilCategorySubscriptionPayloadMutationResolver<
  R = MutationType,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type PerilCategorySubscriptionPayloadNodeResolver<
  R = PerilCategory | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type PerilCategorySubscriptionPayloadUpdatedFieldsResolver<
  R = string[] | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type PerilCategorySubscriptionPayloadPreviousValuesResolver<
  R = PerilCategoryPreviousValues | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;

export interface PerilCategoryPreviousValuesResolvers<Context = any> {
  status?: PerilCategoryPreviousValuesStatusResolver<Status, any, Context>;
  id?: PerilCategoryPreviousValuesIdResolver<string, any, Context>;
  createdAt?: PerilCategoryPreviousValuesCreatedAtResolver<
    DateTime,
    any,
    Context
  >;
  updatedAt?: PerilCategoryPreviousValuesUpdatedAtResolver<
    DateTime,
    any,
    Context
  >;
  name?: PerilCategoryPreviousValuesNameResolver<string, any, Context>;
}

export type PerilCategoryPreviousValuesStatusResolver<
  R = Status,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type PerilCategoryPreviousValuesIdResolver<
  R = string,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type PerilCategoryPreviousValuesCreatedAtResolver<
  R = DateTime,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type PerilCategoryPreviousValuesUpdatedAtResolver<
  R = DateTime,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;
export type PerilCategoryPreviousValuesNameResolver<
  R = string,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>;

export type NewOfferVariables = {};

export type NewOfferQuery = {
  __typename?: 'Query';
  insurance: NewOfferInsurance;
};

export type NewOfferInsurance = {
  __typename?: 'Insurance';
  address?: string | null;
  monthlyCost?: number | null;
  personsInHousehold?: number | null;
  insuredAtOtherCompany?: boolean | null;
  type?: InsuranceType | null;
};

export type OfferPerilsVariables = {};

export type OfferPerilsQuery = {
  __typename?: 'Query';
  insurance: OfferPerilsInsurance;
};

export type OfferPerilsInsurance = {
  __typename?: 'Insurance';
  address?: string | null;
  type?: InsuranceType | null;
  perilCategories?: OfferPerilsPerilCategories[] | null;
};

export type OfferPerilsPerilCategories = {
  __typename?: 'PerilCategory';
  title?: string | null;
  description?: string | null;
  iconUrl?: string | null;
  perils?: OfferPerilsPerils[] | null;
};

export type OfferPerilsPerils = {
  __typename?: 'Peril';
  id?: string | null;
  title?: string | null;
  imageUrl?: string | null;
  description?: string | null;
};

import * as ReactApollo from 'react-apollo';
import * as React from 'react';

import gql from 'graphql-tag';

export const NewOfferDocument = gql`
  query NewOffer {
    insurance {
      address
      monthlyCost
      personsInHousehold
      insuredAtOtherCompany
      type
    }
  }
`;
export class NewOfferComponent extends React.Component<
  Partial<ReactApollo.QueryProps<NewOfferQuery, NewOfferVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<NewOfferQuery, NewOfferVariables>
        query={NewOfferDocument}
        {...this.props as any}
      />
    );
  }
}
export function NewOfferHOC<TProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    NewOfferQuery,
    NewOfferVariables
  >,
) {
  return ReactApollo.graphql<TProps, NewOfferQuery, NewOfferVariables>(
    NewOfferDocument,
    operationOptions as any,
  );
}
export const OfferPerilsDocument = gql`
  query OfferPerils {
    insurance {
      address
      type
      perilCategories {
        title
        description
        iconUrl
        perils {
          id
          title
          imageUrl
          description
        }
      }
    }
  }
`;
export class OfferPerilsComponent extends React.Component<
  Partial<ReactApollo.QueryProps<OfferPerilsQuery, OfferPerilsVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<OfferPerilsQuery, OfferPerilsVariables>
        query={OfferPerilsDocument}
        {...this.props as any}
      />
    );
  }
}
export function OfferPerilsHOC<TProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    OfferPerilsQuery,
    OfferPerilsVariables
  >,
) {
  return ReactApollo.graphql<TProps, OfferPerilsQuery, OfferPerilsVariables>(
    OfferPerilsDocument,
    operationOptions as any,
  );
}
