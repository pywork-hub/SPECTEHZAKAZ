import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type Attribute = {
  name: Scalars['String']['output'];
};

export type Category = {
  id: Scalars['Int']['output'];
  imagePath: Scalars['String']['output'];
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
};

export type CategoryAttribute = {
  name: Scalars['String']['output'];
  properties: Array<SelectOption>;
};

export type CurrentItem = {
  address: Scalars['String']['output'];
  averageRating: Scalars['String']['output'];
  description: Scalars['String']['output'];
  hourPrice: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  imagePaths: Array<Scalars['String']['output']>;
  minHours: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  properties: Array<Property>;
  reviewsCount: Scalars['Int']['output'];
  shiftPrice: Scalars['Int']['output'];
  user: ItemUser;
};

export type CurrentUser = {
  avatarPath: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  role: Role;
};

export type Faq = {
  answer: Scalars['String']['output'];
  question: Scalars['String']['output'];
};

export type HomePage = {
  categories: Array<Category>;
  faqs: Array<Faq>;
  itemRegions: Array<SelectOption>;
  requestRegions: Array<SelectOption>;
  seo?: Maybe<Seo>;
};

export type Item = {
  address: Scalars['String']['output'];
  averageRating: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  hourPrice: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  imagePaths: Array<Scalars['String']['output']>;
  imagesCount: Scalars['Int']['output'];
  minHours: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  properties: Array<Property>;
  reviewsCount: Scalars['Int']['output'];
  shiftPrice: Scalars['Int']['output'];
  user: ItemUser;
};

export type ItemCategory = {
  attributes: Array<CategoryAttribute>;
  label: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type ItemEdit = {
  address: Scalars['String']['output'];
  category: SelectOption;
  description: Scalars['String']['output'];
  hourPrice: Scalars['String']['output'];
  imagePaths: Array<Scalars['String']['output']>;
  minHours: Scalars['String']['output'];
  name: Scalars['String']['output'];
  properties: Array<SelectOption>;
  shiftPrice: Scalars['String']['output'];
};

export type ItemForEdit = {
  categories: Array<ItemCategory>;
  item?: Maybe<ItemEdit>;
  regions: Array<SelectOption>;
};

export type ItemUpsertInput = {
  address: Scalars['String']['input'];
  category: SelectOptionInput;
  description: Scalars['String']['input'];
  hourPrice: Scalars['String']['input'];
  imagePaths: Array<Scalars['String']['input']>;
  minHours: Scalars['String']['input'];
  name: Scalars['String']['input'];
  properties: Array<SelectOptionInput>;
  shiftPrice: Scalars['String']['input'];
};

export type ItemUser = {
  avatarPath: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  itemsCount: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
};

export type Items = {
  items: Array<Item>;
  pages: Scalars['Int']['output'];
};

export type ItemsFiltersInput = {
  categories?: InputMaybe<Array<Scalars['String']['input']>>;
  createdAtSort?: InputMaybe<Sort>;
  maxHourPrice?: InputMaybe<Scalars['String']['input']>;
  maxShiftPrice?: InputMaybe<Scalars['String']['input']>;
  minHourPrice?: InputMaybe<Scalars['String']['input']>;
  minShiftPrice?: InputMaybe<Scalars['String']['input']>;
  pagination: PaginationInput;
  priceSort?: InputMaybe<Sort>;
  ratingSort?: InputMaybe<Sort>;
  regions?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type ItemsPage = {
  categories: Array<SelectOption>;
  regions: Array<SelectOption>;
  seo?: Maybe<Seo>;
};

export type LeaveReviewInput = {
  description: Scalars['String']['input'];
  itemId: Scalars['Int']['input'];
  rating: Scalars['Int']['input'];
};

export type LoginInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  isRemember: Scalars['Boolean']['input'];
  password: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type Metadata = {
  description?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
};

export type Mutation = {
  deleteItem: Scalars['Boolean']['output'];
  deleteRequest: Scalars['Boolean']['output'];
  leaveReview: Scalars['Boolean']['output'];
  login: CurrentUser;
  logout: Scalars['Boolean']['output'];
  promoteItem: Scalars['Boolean']['output'];
  promoteRequest: Scalars['Boolean']['output'];
  register: CurrentUser;
  sendVerification: Scalars['Boolean']['output'];
  updatePassword: Scalars['Boolean']['output'];
  updateProfile: Scalars['Boolean']['output'];
  upsertItem?: Maybe<Scalars['String']['output']>;
  upsertRequest: Scalars['Boolean']['output'];
};


export type MutationDeleteItemArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteRequestArgs = {
  id: Scalars['Int']['input'];
};


export type MutationLeaveReviewArgs = {
  data: LeaveReviewInput;
};


export type MutationLoginArgs = {
  data: LoginInput;
};


export type MutationPromoteItemArgs = {
  id: Scalars['Int']['input'];
};


export type MutationPromoteRequestArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRegisterArgs = {
  data: RegisterInput;
};


export type MutationSendVerificationArgs = {
  phone: Scalars['String']['input'];
  token: Scalars['String']['input'];
};


export type MutationUpdatePasswordArgs = {
  data: UpdatePasswordInput;
};


export type MutationUpdateProfileArgs = {
  data: ProfileUpdateInput;
};


export type MutationUpsertItemArgs = {
  data: ItemUpsertInput;
  id?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationUpsertRequestArgs = {
  data: RequestUpsertInput;
  id?: InputMaybe<Scalars['Int']['input']>;
};

export enum Page {
  Home = 'HOME',
  Items = 'ITEMS',
  Requests = 'REQUESTS'
}

export type PaginationInput = {
  page: Scalars['Int']['input'];
  take: Scalars['Int']['input'];
};

export enum PaymentMethod {
  Cash = 'CASH',
  CashlessWithoutVat = 'CASHLESS_WITHOUT_VAT',
  CashlessWithVat = 'CASHLESS_WITH_VAT'
}

export enum PricingType {
  ForShift = 'FOR_SHIFT',
  ForTrip = 'FOR_TRIP',
  PerHour = 'PER_HOUR',
  PerM3 = 'PER_M3',
  PerTon = 'PER_TON'
}

export type Profile = {
  avatarPath: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  itemsCount: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  requestsCount: Scalars['Int']['output'];
};

export type ProfileEdit = {
  avatarPath: Array<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
};

export type ProfileItem = {
  address: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  hourPrice: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  imagePaths: Array<Scalars['String']['output']>;
  imagesCount: Scalars['Int']['output'];
  minHours: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  promotionExpiredAt?: Maybe<Scalars['String']['output']>;
  properties: Array<Property>;
  shiftPrice: Scalars['Int']['output'];
  status: Status;
};

export type ProfileItems = {
  items: Array<ProfileItem>;
  pages: Scalars['Int']['output'];
};

export type ProfileRequest = {
  category: RequestCategory;
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  paymentMethod: PaymentMethod;
  price?: Maybe<Scalars['Int']['output']>;
  pricingType: PricingType;
  promotionExpiredAt?: Maybe<Scalars['String']['output']>;
  quantity: Scalars['Int']['output'];
  region: Scalars['String']['output'];
  startAt: Scalars['String']['output'];
  status: Status;
};

export type ProfileRequests = {
  pages: Scalars['Int']['output'];
  requests: Array<ProfileRequest>;
};

export type ProfileUpdateInput = {
  avatarPath: Array<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  newPassword?: InputMaybe<Scalars['String']['input']>;
  oldPassword?: InputMaybe<Scalars['String']['input']>;
  phone: Scalars['String']['input'];
};

export type Property = {
  attribute: Attribute;
  value: Scalars['String']['output'];
};

export type Query = {
  currentItem: CurrentItem;
  currentUser: CurrentUser;
  homePage: HomePage;
  itemForEdit: ItemForEdit;
  items: Items;
  itemsPage: ItemsPage;
  metadata?: Maybe<Metadata>;
  profile: Profile;
  profileForEdit: ProfileEdit;
  profileItems: ProfileItems;
  profileRequests: ProfileRequests;
  requestForEdit: RequestForEdit;
  requests: Requests;
  requestsPage: RequestsPage;
  reviews: Reviews;
  seo?: Maybe<Seo>;
};


export type QueryCurrentItemArgs = {
  id: Scalars['Int']['input'];
};


export type QueryItemForEditArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryItemsArgs = {
  filters: ItemsFiltersInput;
};


export type QueryMetadataArgs = {
  page: Page;
};


export type QueryProfileItemsArgs = {
  pagination: PaginationInput;
};


export type QueryProfileRequestsArgs = {
  pagination: PaginationInput;
};


export type QueryRequestForEditArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryRequestsArgs = {
  filters: RequestsFiltersInput;
};


export type QueryReviewsArgs = {
  filters: ReviewsFiltersInput;
};


export type QuerySeoArgs = {
  page: Page;
};

export type RegisterInput = {
  email: Scalars['String']['input'];
  isRemember: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phone: Scalars['String']['input'];
};

export type Request = {
  category: RequestCategory;
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  paymentMethod: PaymentMethod;
  phone: Scalars['String']['output'];
  price?: Maybe<Scalars['Int']['output']>;
  pricingType: PricingType;
  quantity: Scalars['Int']['output'];
  region: Scalars['String']['output'];
  startAt: Scalars['String']['output'];
  user: UserContacts;
};

export type RequestCategory = {
  iconPath: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type RequestEdit = {
  category: SelectOption;
  description: Scalars['String']['output'];
  paymentMethod: SelectOption;
  phone: Scalars['String']['output'];
  price?: Maybe<Scalars['String']['output']>;
  pricingType: SelectOption;
  quantity: Scalars['String']['output'];
  region: SelectOption;
  startAt: Scalars['String']['output'];
};

export type RequestForEdit = {
  categories: Array<SelectOption>;
  regions: Array<SelectOption>;
  request?: Maybe<RequestEdit>;
};

export type RequestUpsertInput = {
  category: SelectOptionInput;
  description: Scalars['String']['input'];
  paymentMethod: SelectOptionInput;
  phone: Scalars['String']['input'];
  price?: InputMaybe<Scalars['String']['input']>;
  pricingType: SelectOptionInput;
  quantity: Scalars['String']['input'];
  region: SelectOptionInput;
  startAt: Scalars['String']['input'];
};

export type Requests = {
  pages: Scalars['Int']['output'];
  requests: Array<Request>;
};

export type RequestsFiltersInput = {
  categories?: InputMaybe<Array<Scalars['String']['input']>>;
  pagination: PaginationInput;
  paymentMethod?: InputMaybe<PaymentMethod>;
  regions?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type RequestsPage = {
  categories: Array<SelectOption>;
  regions: Array<SelectOption>;
  seo?: Maybe<Seo>;
};

export type Review = {
  createdAt: Scalars['String']['output'];
  description: Scalars['String']['output'];
  filePath?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  rating: Scalars['Int']['output'];
};

export type Reviews = {
  pages: Scalars['Int']['output'];
  reviews: Array<Review>;
};

export type ReviewsFiltersInput = {
  itemId: Scalars['Int']['input'];
  pagination: PaginationInput;
};

export enum Role {
  Admin = 'ADMIN',
  User = 'USER'
}

export type SelectOption = {
  label: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type SelectOptionInput = {
  label: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type Seo = {
  description: Scalars['String']['output'];
  heading: Scalars['String']['output'];
};

export enum Sort {
  Asc = 'ASC',
  Desc = 'DESC'
}

export enum Status {
  Canceled = 'CANCELED',
  Published = 'PUBLISHED',
  UnderReview = 'UNDER_REVIEW'
}

export type UpdatePasswordInput = {
  confirmPassword: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phone: Scalars['String']['input'];
};

export type UserContacts = {
  phone: Scalars['String']['output'];
};

export type LoginMutationVariables = Exact<{
  data: LoginInput;
}>;


export type LoginMutation = { login: { id: number, name: string, email: string, avatarPath: string, role: Role } };

export type RegisterMutationVariables = Exact<{
  data: RegisterInput;
}>;


export type RegisterMutation = { register: { id: number, name: string, email: string, avatarPath: string, role: Role } };

export type SendVerificationMutationVariables = Exact<{
  token: Scalars['String']['input'];
  phone: Scalars['String']['input'];
}>;


export type SendVerificationMutation = { sendVerification: boolean };

export type UpdatePasswordMutationVariables = Exact<{
  data: UpdatePasswordInput;
}>;


export type UpdatePasswordMutation = { updatePassword: boolean };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { logout: boolean };

export type DeleteItemMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteItemMutation = { deleteItem: boolean };

export type PromoteItemMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type PromoteItemMutation = { promoteItem: boolean };

export type UpsertItemMutationVariables = Exact<{
  data: ItemUpsertInput;
  id?: InputMaybe<Scalars['Int']['input']>;
}>;


export type UpsertItemMutation = { upsertItem?: string | null };

export type DeleteRequestMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteRequestMutation = { deleteRequest: boolean };

export type PromoteRequestMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type PromoteRequestMutation = { promoteRequest: boolean };

export type UpsertRequestMutationVariables = Exact<{
  data: RequestUpsertInput;
  id?: InputMaybe<Scalars['Int']['input']>;
}>;


export type UpsertRequestMutation = { upsertRequest: boolean };

export type LeaveReviewMutationVariables = Exact<{
  data: LeaveReviewInput;
}>;


export type LeaveReviewMutation = { leaveReview: boolean };

export type UpdateProfileMutationVariables = Exact<{
  data: ProfileUpdateInput;
}>;


export type UpdateProfileMutation = { updateProfile: boolean };

export type CurrentItemQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type CurrentItemQuery = { currentItem: { id: number, name: string, address: string, description: string, imagePaths: Array<string>, hourPrice: number, shiftPrice: number, minHours: number, averageRating: string, reviewsCount: number, properties: Array<{ value: string, attribute: { name: string } }>, user: { name: string, avatarPath: string, itemsCount: number, phone: string, createdAt: string } } };

export type ItemsQueryVariables = Exact<{
  filters: ItemsFiltersInput;
}>;


export type ItemsQuery = { items: { pages: number, items: Array<{ id: number, name: string, address: string, imagePaths: Array<string>, imagesCount: number, hourPrice: number, shiftPrice: number, minHours: number, averageRating: string, reviewsCount: number, createdAt: any, properties: Array<{ value: string, attribute: { name: string } }>, user: { name: string, avatarPath: string, phone: string, itemsCount: number, createdAt: string } }> } };

export type MetadataQueryVariables = Exact<{
  page: Page;
}>;


export type MetadataQuery = { metadata?: { title: string, description?: string | null } | null };

export type HomePageQueryVariables = Exact<{ [key: string]: never; }>;


export type HomePageQuery = { homePage: { categories: Array<{ id: number, name: string, slug: string, imagePath: string }>, itemRegions: Array<{ label: string, value: string }>, requestRegions: Array<{ label: string, value: string }>, seo?: { heading: string, description: string } | null, faqs: Array<{ question: string, answer: string }> } };

export type ItemsPageQueryVariables = Exact<{ [key: string]: never; }>;


export type ItemsPageQuery = { itemsPage: { categories: Array<{ label: string, value: string }>, regions: Array<{ label: string, value: string }>, seo?: { heading: string, description: string } | null } };

export type RequestsPageQueryVariables = Exact<{ [key: string]: never; }>;


export type RequestsPageQuery = { requestsPage: { categories: Array<{ label: string, value: string }>, regions: Array<{ label: string, value: string }>, seo?: { heading: string, description: string } | null } };

export type RequestsQueryVariables = Exact<{
  filters: RequestsFiltersInput;
}>;


export type RequestsQuery = { requests: { pages: number, requests: Array<{ id: number, region: string, description: string, phone: string, quantity: number, startAt: string, price?: number | null, pricingType: PricingType, paymentMethod: PaymentMethod, createdAt: any, category: { name: string, iconPath: string }, user: { phone: string } }> } };

export type ReviewsQueryVariables = Exact<{
  filters: ReviewsFiltersInput;
}>;


export type ReviewsQuery = { reviews: { pages: number, reviews: Array<{ name: string, description: string, filePath?: string | null, rating: number, createdAt: string }> } };

export type ItemForEditQueryVariables = Exact<{
  id?: InputMaybe<Scalars['Int']['input']>;
}>;


export type ItemForEditQuery = { itemForEdit: { item?: { name: string, address: string, description: string, imagePaths: Array<string>, hourPrice: string, shiftPrice: string, minHours: string, properties: Array<{ label: string, value: string }>, category: { label: string, value: string } } | null, regions: Array<{ label: string, value: string }>, categories: Array<{ label: string, value: string, attributes: Array<{ name: string, properties: Array<{ label: string, value: string }> }> }> } };

export type ProfileItemsQueryVariables = Exact<{
  pagination: PaginationInput;
}>;


export type ProfileItemsQuery = { profileItems: { pages: number, items: Array<{ id: number, name: string, address: string, imagePaths: Array<string>, imagesCount: number, hourPrice: number, shiftPrice: number, minHours: number, status: Status, promotionExpiredAt?: string | null, createdAt: any, properties: Array<{ value: string, attribute: { name: string } }> }> } };

export type ProfileRequestsQueryVariables = Exact<{
  pagination: PaginationInput;
}>;


export type ProfileRequestsQuery = { profileRequests: { pages: number, requests: Array<{ id: number, region: string, description: string, quantity: number, startAt: string, price?: number | null, pricingType: PricingType, paymentMethod: PaymentMethod, createdAt: any, status: Status, promotionExpiredAt?: string | null, category: { name: string, iconPath: string } }> } };

export type RequestForEditQueryVariables = Exact<{
  id?: InputMaybe<Scalars['Int']['input']>;
}>;


export type RequestForEditQuery = { requestForEdit: { request?: { description: string, phone: string, price?: string | null, quantity: string, startAt: string, region: { label: string, value: string }, pricingType: { label: string, value: string }, paymentMethod: { label: string, value: string }, category: { label: string, value: string } } | null, regions: Array<{ label: string, value: string }>, categories: Array<{ label: string, value: string }> } };

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { currentUser: { id: number, name: string, email: string, avatarPath: string, role: Role } };

export type ProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type ProfileQuery = { profile: { id: number, name: string, email: string, avatarPath: string, createdAt: string, phone: string, itemsCount: number, requestsCount: number } };

export type ProfileForEditQueryVariables = Exact<{ [key: string]: never; }>;


export type ProfileForEditQuery = { profileForEdit: { name: string, email: string, phone: string, avatarPath: Array<string> } };


export const LoginDocument = gql`
    mutation Login($data: LoginInput!) {
  login(data: $data) {
    id
    name
    email
    avatarPath
    role
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($data: RegisterInput!) {
  register(data: $data) {
    id
    name
    email
    avatarPath
    role
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const SendVerificationDocument = gql`
    mutation SendVerification($token: String!, $phone: String!) {
  sendVerification(token: $token, phone: $phone)
}
    `;
export type SendVerificationMutationFn = Apollo.MutationFunction<SendVerificationMutation, SendVerificationMutationVariables>;

/**
 * __useSendVerificationMutation__
 *
 * To run a mutation, you first call `useSendVerificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendVerificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendVerificationMutation, { data, loading, error }] = useSendVerificationMutation({
 *   variables: {
 *      token: // value for 'token'
 *      phone: // value for 'phone'
 *   },
 * });
 */
export function useSendVerificationMutation(baseOptions?: Apollo.MutationHookOptions<SendVerificationMutation, SendVerificationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendVerificationMutation, SendVerificationMutationVariables>(SendVerificationDocument, options);
      }
export type SendVerificationMutationHookResult = ReturnType<typeof useSendVerificationMutation>;
export type SendVerificationMutationResult = Apollo.MutationResult<SendVerificationMutation>;
export type SendVerificationMutationOptions = Apollo.BaseMutationOptions<SendVerificationMutation, SendVerificationMutationVariables>;
export const UpdatePasswordDocument = gql`
    mutation UpdatePassword($data: UpdatePasswordInput!) {
  updatePassword(data: $data)
}
    `;
export type UpdatePasswordMutationFn = Apollo.MutationFunction<UpdatePasswordMutation, UpdatePasswordMutationVariables>;

/**
 * __useUpdatePasswordMutation__
 *
 * To run a mutation, you first call `useUpdatePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePasswordMutation, { data, loading, error }] = useUpdatePasswordMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdatePasswordMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePasswordMutation, UpdatePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePasswordMutation, UpdatePasswordMutationVariables>(UpdatePasswordDocument, options);
      }
export type UpdatePasswordMutationHookResult = ReturnType<typeof useUpdatePasswordMutation>;
export type UpdatePasswordMutationResult = Apollo.MutationResult<UpdatePasswordMutation>;
export type UpdatePasswordMutationOptions = Apollo.BaseMutationOptions<UpdatePasswordMutation, UpdatePasswordMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const DeleteItemDocument = gql`
    mutation DeleteItem($id: Int!) {
  deleteItem(id: $id)
}
    `;
export type DeleteItemMutationFn = Apollo.MutationFunction<DeleteItemMutation, DeleteItemMutationVariables>;

/**
 * __useDeleteItemMutation__
 *
 * To run a mutation, you first call `useDeleteItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteItemMutation, { data, loading, error }] = useDeleteItemMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteItemMutation(baseOptions?: Apollo.MutationHookOptions<DeleteItemMutation, DeleteItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteItemMutation, DeleteItemMutationVariables>(DeleteItemDocument, options);
      }
export type DeleteItemMutationHookResult = ReturnType<typeof useDeleteItemMutation>;
export type DeleteItemMutationResult = Apollo.MutationResult<DeleteItemMutation>;
export type DeleteItemMutationOptions = Apollo.BaseMutationOptions<DeleteItemMutation, DeleteItemMutationVariables>;
export const PromoteItemDocument = gql`
    mutation PromoteItem($id: Int!) {
  promoteItem(id: $id)
}
    `;
export type PromoteItemMutationFn = Apollo.MutationFunction<PromoteItemMutation, PromoteItemMutationVariables>;

/**
 * __usePromoteItemMutation__
 *
 * To run a mutation, you first call `usePromoteItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePromoteItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [promoteItemMutation, { data, loading, error }] = usePromoteItemMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePromoteItemMutation(baseOptions?: Apollo.MutationHookOptions<PromoteItemMutation, PromoteItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PromoteItemMutation, PromoteItemMutationVariables>(PromoteItemDocument, options);
      }
export type PromoteItemMutationHookResult = ReturnType<typeof usePromoteItemMutation>;
export type PromoteItemMutationResult = Apollo.MutationResult<PromoteItemMutation>;
export type PromoteItemMutationOptions = Apollo.BaseMutationOptions<PromoteItemMutation, PromoteItemMutationVariables>;
export const UpsertItemDocument = gql`
    mutation UpsertItem($data: ItemUpsertInput!, $id: Int) {
  upsertItem(data: $data, id: $id)
}
    `;
export type UpsertItemMutationFn = Apollo.MutationFunction<UpsertItemMutation, UpsertItemMutationVariables>;

/**
 * __useUpsertItemMutation__
 *
 * To run a mutation, you first call `useUpsertItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpsertItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upsertItemMutation, { data, loading, error }] = useUpsertItemMutation({
 *   variables: {
 *      data: // value for 'data'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUpsertItemMutation(baseOptions?: Apollo.MutationHookOptions<UpsertItemMutation, UpsertItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpsertItemMutation, UpsertItemMutationVariables>(UpsertItemDocument, options);
      }
export type UpsertItemMutationHookResult = ReturnType<typeof useUpsertItemMutation>;
export type UpsertItemMutationResult = Apollo.MutationResult<UpsertItemMutation>;
export type UpsertItemMutationOptions = Apollo.BaseMutationOptions<UpsertItemMutation, UpsertItemMutationVariables>;
export const DeleteRequestDocument = gql`
    mutation DeleteRequest($id: Int!) {
  deleteRequest(id: $id)
}
    `;
export type DeleteRequestMutationFn = Apollo.MutationFunction<DeleteRequestMutation, DeleteRequestMutationVariables>;

/**
 * __useDeleteRequestMutation__
 *
 * To run a mutation, you first call `useDeleteRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteRequestMutation, { data, loading, error }] = useDeleteRequestMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteRequestMutation(baseOptions?: Apollo.MutationHookOptions<DeleteRequestMutation, DeleteRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteRequestMutation, DeleteRequestMutationVariables>(DeleteRequestDocument, options);
      }
export type DeleteRequestMutationHookResult = ReturnType<typeof useDeleteRequestMutation>;
export type DeleteRequestMutationResult = Apollo.MutationResult<DeleteRequestMutation>;
export type DeleteRequestMutationOptions = Apollo.BaseMutationOptions<DeleteRequestMutation, DeleteRequestMutationVariables>;
export const PromoteRequestDocument = gql`
    mutation PromoteRequest($id: Int!) {
  promoteRequest(id: $id)
}
    `;
export type PromoteRequestMutationFn = Apollo.MutationFunction<PromoteRequestMutation, PromoteRequestMutationVariables>;

/**
 * __usePromoteRequestMutation__
 *
 * To run a mutation, you first call `usePromoteRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePromoteRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [promoteRequestMutation, { data, loading, error }] = usePromoteRequestMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePromoteRequestMutation(baseOptions?: Apollo.MutationHookOptions<PromoteRequestMutation, PromoteRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PromoteRequestMutation, PromoteRequestMutationVariables>(PromoteRequestDocument, options);
      }
export type PromoteRequestMutationHookResult = ReturnType<typeof usePromoteRequestMutation>;
export type PromoteRequestMutationResult = Apollo.MutationResult<PromoteRequestMutation>;
export type PromoteRequestMutationOptions = Apollo.BaseMutationOptions<PromoteRequestMutation, PromoteRequestMutationVariables>;
export const UpsertRequestDocument = gql`
    mutation UpsertRequest($data: RequestUpsertInput!, $id: Int) {
  upsertRequest(data: $data, id: $id)
}
    `;
export type UpsertRequestMutationFn = Apollo.MutationFunction<UpsertRequestMutation, UpsertRequestMutationVariables>;

/**
 * __useUpsertRequestMutation__
 *
 * To run a mutation, you first call `useUpsertRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpsertRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upsertRequestMutation, { data, loading, error }] = useUpsertRequestMutation({
 *   variables: {
 *      data: // value for 'data'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUpsertRequestMutation(baseOptions?: Apollo.MutationHookOptions<UpsertRequestMutation, UpsertRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpsertRequestMutation, UpsertRequestMutationVariables>(UpsertRequestDocument, options);
      }
export type UpsertRequestMutationHookResult = ReturnType<typeof useUpsertRequestMutation>;
export type UpsertRequestMutationResult = Apollo.MutationResult<UpsertRequestMutation>;
export type UpsertRequestMutationOptions = Apollo.BaseMutationOptions<UpsertRequestMutation, UpsertRequestMutationVariables>;
export const LeaveReviewDocument = gql`
    mutation LeaveReview($data: LeaveReviewInput!) {
  leaveReview(data: $data)
}
    `;
export type LeaveReviewMutationFn = Apollo.MutationFunction<LeaveReviewMutation, LeaveReviewMutationVariables>;

/**
 * __useLeaveReviewMutation__
 *
 * To run a mutation, you first call `useLeaveReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLeaveReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [leaveReviewMutation, { data, loading, error }] = useLeaveReviewMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useLeaveReviewMutation(baseOptions?: Apollo.MutationHookOptions<LeaveReviewMutation, LeaveReviewMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LeaveReviewMutation, LeaveReviewMutationVariables>(LeaveReviewDocument, options);
      }
export type LeaveReviewMutationHookResult = ReturnType<typeof useLeaveReviewMutation>;
export type LeaveReviewMutationResult = Apollo.MutationResult<LeaveReviewMutation>;
export type LeaveReviewMutationOptions = Apollo.BaseMutationOptions<LeaveReviewMutation, LeaveReviewMutationVariables>;
export const UpdateProfileDocument = gql`
    mutation UpdateProfile($data: ProfileUpdateInput!) {
  updateProfile(data: $data)
}
    `;
export type UpdateProfileMutationFn = Apollo.MutationFunction<UpdateProfileMutation, UpdateProfileMutationVariables>;

/**
 * __useUpdateProfileMutation__
 *
 * To run a mutation, you first call `useUpdateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfileMutation, { data, loading, error }] = useUpdateProfileMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateProfileMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProfileMutation, UpdateProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProfileMutation, UpdateProfileMutationVariables>(UpdateProfileDocument, options);
      }
export type UpdateProfileMutationHookResult = ReturnType<typeof useUpdateProfileMutation>;
export type UpdateProfileMutationResult = Apollo.MutationResult<UpdateProfileMutation>;
export type UpdateProfileMutationOptions = Apollo.BaseMutationOptions<UpdateProfileMutation, UpdateProfileMutationVariables>;
export const CurrentItemDocument = gql`
    query CurrentItem($id: Int!) {
  currentItem(id: $id) {
    id
    name
    address
    description
    imagePaths
    hourPrice
    shiftPrice
    minHours
    averageRating
    reviewsCount
    properties {
      attribute {
        name
      }
      value
    }
    user {
      name
      avatarPath
      itemsCount
      phone
      createdAt
    }
  }
}
    `;

/**
 * __useCurrentItemQuery__
 *
 * To run a query within a React component, call `useCurrentItemQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentItemQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentItemQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCurrentItemQuery(baseOptions: Apollo.QueryHookOptions<CurrentItemQuery, CurrentItemQueryVariables> & ({ variables: CurrentItemQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CurrentItemQuery, CurrentItemQueryVariables>(CurrentItemDocument, options);
      }
export function useCurrentItemLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentItemQuery, CurrentItemQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CurrentItemQuery, CurrentItemQueryVariables>(CurrentItemDocument, options);
        }
export function useCurrentItemSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<CurrentItemQuery, CurrentItemQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CurrentItemQuery, CurrentItemQueryVariables>(CurrentItemDocument, options);
        }
export type CurrentItemQueryHookResult = ReturnType<typeof useCurrentItemQuery>;
export type CurrentItemLazyQueryHookResult = ReturnType<typeof useCurrentItemLazyQuery>;
export type CurrentItemSuspenseQueryHookResult = ReturnType<typeof useCurrentItemSuspenseQuery>;
export type CurrentItemQueryResult = Apollo.QueryResult<CurrentItemQuery, CurrentItemQueryVariables>;
export const ItemsDocument = gql`
    query Items($filters: ItemsFiltersInput!) {
  items(filters: $filters) {
    items {
      id
      name
      address
      imagePaths
      imagesCount
      hourPrice
      shiftPrice
      minHours
      averageRating
      reviewsCount
      createdAt
      properties {
        value
        attribute {
          name
        }
      }
      user {
        name
        avatarPath
        phone
        itemsCount
        createdAt
      }
    }
    pages
  }
}
    `;

/**
 * __useItemsQuery__
 *
 * To run a query within a React component, call `useItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useItemsQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *   },
 * });
 */
export function useItemsQuery(baseOptions: Apollo.QueryHookOptions<ItemsQuery, ItemsQueryVariables> & ({ variables: ItemsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ItemsQuery, ItemsQueryVariables>(ItemsDocument, options);
      }
export function useItemsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ItemsQuery, ItemsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ItemsQuery, ItemsQueryVariables>(ItemsDocument, options);
        }
export function useItemsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ItemsQuery, ItemsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ItemsQuery, ItemsQueryVariables>(ItemsDocument, options);
        }
export type ItemsQueryHookResult = ReturnType<typeof useItemsQuery>;
export type ItemsLazyQueryHookResult = ReturnType<typeof useItemsLazyQuery>;
export type ItemsSuspenseQueryHookResult = ReturnType<typeof useItemsSuspenseQuery>;
export type ItemsQueryResult = Apollo.QueryResult<ItemsQuery, ItemsQueryVariables>;
export const MetadataDocument = gql`
    query Metadata($page: Page!) {
  metadata(page: $page) {
    title
    description
  }
}
    `;

/**
 * __useMetadataQuery__
 *
 * To run a query within a React component, call `useMetadataQuery` and pass it any options that fit your needs.
 * When your component renders, `useMetadataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMetadataQuery({
 *   variables: {
 *      page: // value for 'page'
 *   },
 * });
 */
export function useMetadataQuery(baseOptions: Apollo.QueryHookOptions<MetadataQuery, MetadataQueryVariables> & ({ variables: MetadataQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MetadataQuery, MetadataQueryVariables>(MetadataDocument, options);
      }
export function useMetadataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MetadataQuery, MetadataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MetadataQuery, MetadataQueryVariables>(MetadataDocument, options);
        }
export function useMetadataSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MetadataQuery, MetadataQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MetadataQuery, MetadataQueryVariables>(MetadataDocument, options);
        }
export type MetadataQueryHookResult = ReturnType<typeof useMetadataQuery>;
export type MetadataLazyQueryHookResult = ReturnType<typeof useMetadataLazyQuery>;
export type MetadataSuspenseQueryHookResult = ReturnType<typeof useMetadataSuspenseQuery>;
export type MetadataQueryResult = Apollo.QueryResult<MetadataQuery, MetadataQueryVariables>;
export const HomePageDocument = gql`
    query HomePage {
  homePage {
    categories {
      id
      name
      slug
      imagePath
    }
    itemRegions {
      label
      value
    }
    requestRegions {
      label
      value
    }
    seo {
      heading
      description
    }
    faqs {
      question
      answer
    }
  }
}
    `;

/**
 * __useHomePageQuery__
 *
 * To run a query within a React component, call `useHomePageQuery` and pass it any options that fit your needs.
 * When your component renders, `useHomePageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHomePageQuery({
 *   variables: {
 *   },
 * });
 */
export function useHomePageQuery(baseOptions?: Apollo.QueryHookOptions<HomePageQuery, HomePageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HomePageQuery, HomePageQueryVariables>(HomePageDocument, options);
      }
export function useHomePageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HomePageQuery, HomePageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HomePageQuery, HomePageQueryVariables>(HomePageDocument, options);
        }
export function useHomePageSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<HomePageQuery, HomePageQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<HomePageQuery, HomePageQueryVariables>(HomePageDocument, options);
        }
export type HomePageQueryHookResult = ReturnType<typeof useHomePageQuery>;
export type HomePageLazyQueryHookResult = ReturnType<typeof useHomePageLazyQuery>;
export type HomePageSuspenseQueryHookResult = ReturnType<typeof useHomePageSuspenseQuery>;
export type HomePageQueryResult = Apollo.QueryResult<HomePageQuery, HomePageQueryVariables>;
export const ItemsPageDocument = gql`
    query ItemsPage {
  itemsPage {
    categories {
      label
      value
    }
    regions {
      label
      value
    }
    seo {
      heading
      description
    }
  }
}
    `;

/**
 * __useItemsPageQuery__
 *
 * To run a query within a React component, call `useItemsPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useItemsPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useItemsPageQuery({
 *   variables: {
 *   },
 * });
 */
export function useItemsPageQuery(baseOptions?: Apollo.QueryHookOptions<ItemsPageQuery, ItemsPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ItemsPageQuery, ItemsPageQueryVariables>(ItemsPageDocument, options);
      }
export function useItemsPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ItemsPageQuery, ItemsPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ItemsPageQuery, ItemsPageQueryVariables>(ItemsPageDocument, options);
        }
export function useItemsPageSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ItemsPageQuery, ItemsPageQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ItemsPageQuery, ItemsPageQueryVariables>(ItemsPageDocument, options);
        }
export type ItemsPageQueryHookResult = ReturnType<typeof useItemsPageQuery>;
export type ItemsPageLazyQueryHookResult = ReturnType<typeof useItemsPageLazyQuery>;
export type ItemsPageSuspenseQueryHookResult = ReturnType<typeof useItemsPageSuspenseQuery>;
export type ItemsPageQueryResult = Apollo.QueryResult<ItemsPageQuery, ItemsPageQueryVariables>;
export const RequestsPageDocument = gql`
    query RequestsPage {
  requestsPage {
    categories {
      label
      value
    }
    regions {
      label
      value
    }
    seo {
      heading
      description
    }
  }
}
    `;

/**
 * __useRequestsPageQuery__
 *
 * To run a query within a React component, call `useRequestsPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useRequestsPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRequestsPageQuery({
 *   variables: {
 *   },
 * });
 */
export function useRequestsPageQuery(baseOptions?: Apollo.QueryHookOptions<RequestsPageQuery, RequestsPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RequestsPageQuery, RequestsPageQueryVariables>(RequestsPageDocument, options);
      }
export function useRequestsPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RequestsPageQuery, RequestsPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RequestsPageQuery, RequestsPageQueryVariables>(RequestsPageDocument, options);
        }
export function useRequestsPageSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<RequestsPageQuery, RequestsPageQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<RequestsPageQuery, RequestsPageQueryVariables>(RequestsPageDocument, options);
        }
export type RequestsPageQueryHookResult = ReturnType<typeof useRequestsPageQuery>;
export type RequestsPageLazyQueryHookResult = ReturnType<typeof useRequestsPageLazyQuery>;
export type RequestsPageSuspenseQueryHookResult = ReturnType<typeof useRequestsPageSuspenseQuery>;
export type RequestsPageQueryResult = Apollo.QueryResult<RequestsPageQuery, RequestsPageQueryVariables>;
export const RequestsDocument = gql`
    query Requests($filters: RequestsFiltersInput!) {
  requests(filters: $filters) {
    requests {
      id
      region
      description
      phone
      quantity
      startAt
      price
      pricingType
      paymentMethod
      createdAt
      category {
        name
        iconPath
      }
      user {
        phone
      }
    }
    pages
  }
}
    `;

/**
 * __useRequestsQuery__
 *
 * To run a query within a React component, call `useRequestsQuery` and pass it any options that fit your needs.
 * When your component renders, `useRequestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRequestsQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *   },
 * });
 */
export function useRequestsQuery(baseOptions: Apollo.QueryHookOptions<RequestsQuery, RequestsQueryVariables> & ({ variables: RequestsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RequestsQuery, RequestsQueryVariables>(RequestsDocument, options);
      }
export function useRequestsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RequestsQuery, RequestsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RequestsQuery, RequestsQueryVariables>(RequestsDocument, options);
        }
export function useRequestsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<RequestsQuery, RequestsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<RequestsQuery, RequestsQueryVariables>(RequestsDocument, options);
        }
export type RequestsQueryHookResult = ReturnType<typeof useRequestsQuery>;
export type RequestsLazyQueryHookResult = ReturnType<typeof useRequestsLazyQuery>;
export type RequestsSuspenseQueryHookResult = ReturnType<typeof useRequestsSuspenseQuery>;
export type RequestsQueryResult = Apollo.QueryResult<RequestsQuery, RequestsQueryVariables>;
export const ReviewsDocument = gql`
    query Reviews($filters: ReviewsFiltersInput!) {
  reviews(filters: $filters) {
    reviews {
      name
      description
      filePath
      rating
      createdAt
    }
    pages
  }
}
    `;

/**
 * __useReviewsQuery__
 *
 * To run a query within a React component, call `useReviewsQuery` and pass it any options that fit your needs.
 * When your component renders, `useReviewsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReviewsQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *   },
 * });
 */
export function useReviewsQuery(baseOptions: Apollo.QueryHookOptions<ReviewsQuery, ReviewsQueryVariables> & ({ variables: ReviewsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ReviewsQuery, ReviewsQueryVariables>(ReviewsDocument, options);
      }
export function useReviewsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ReviewsQuery, ReviewsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ReviewsQuery, ReviewsQueryVariables>(ReviewsDocument, options);
        }
export function useReviewsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ReviewsQuery, ReviewsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ReviewsQuery, ReviewsQueryVariables>(ReviewsDocument, options);
        }
export type ReviewsQueryHookResult = ReturnType<typeof useReviewsQuery>;
export type ReviewsLazyQueryHookResult = ReturnType<typeof useReviewsLazyQuery>;
export type ReviewsSuspenseQueryHookResult = ReturnType<typeof useReviewsSuspenseQuery>;
export type ReviewsQueryResult = Apollo.QueryResult<ReviewsQuery, ReviewsQueryVariables>;
export const ItemForEditDocument = gql`
    query ItemForEdit($id: Int) {
  itemForEdit(id: $id) {
    item {
      name
      address
      description
      imagePaths
      hourPrice
      shiftPrice
      minHours
      properties {
        label
        value
      }
      category {
        label
        value
      }
    }
    regions {
      label
      value
    }
    categories {
      label
      value
      attributes {
        name
        properties {
          label
          value
        }
      }
    }
  }
}
    `;

/**
 * __useItemForEditQuery__
 *
 * To run a query within a React component, call `useItemForEditQuery` and pass it any options that fit your needs.
 * When your component renders, `useItemForEditQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useItemForEditQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useItemForEditQuery(baseOptions?: Apollo.QueryHookOptions<ItemForEditQuery, ItemForEditQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ItemForEditQuery, ItemForEditQueryVariables>(ItemForEditDocument, options);
      }
export function useItemForEditLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ItemForEditQuery, ItemForEditQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ItemForEditQuery, ItemForEditQueryVariables>(ItemForEditDocument, options);
        }
export function useItemForEditSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ItemForEditQuery, ItemForEditQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ItemForEditQuery, ItemForEditQueryVariables>(ItemForEditDocument, options);
        }
export type ItemForEditQueryHookResult = ReturnType<typeof useItemForEditQuery>;
export type ItemForEditLazyQueryHookResult = ReturnType<typeof useItemForEditLazyQuery>;
export type ItemForEditSuspenseQueryHookResult = ReturnType<typeof useItemForEditSuspenseQuery>;
export type ItemForEditQueryResult = Apollo.QueryResult<ItemForEditQuery, ItemForEditQueryVariables>;
export const ProfileItemsDocument = gql`
    query ProfileItems($pagination: PaginationInput!) {
  profileItems(pagination: $pagination) {
    items {
      id
      name
      address
      imagePaths
      imagesCount
      hourPrice
      shiftPrice
      minHours
      status
      promotionExpiredAt
      properties {
        value
        attribute {
          name
        }
      }
      createdAt
    }
    pages
  }
}
    `;

/**
 * __useProfileItemsQuery__
 *
 * To run a query within a React component, call `useProfileItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProfileItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfileItemsQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useProfileItemsQuery(baseOptions: Apollo.QueryHookOptions<ProfileItemsQuery, ProfileItemsQueryVariables> & ({ variables: ProfileItemsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProfileItemsQuery, ProfileItemsQueryVariables>(ProfileItemsDocument, options);
      }
export function useProfileItemsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProfileItemsQuery, ProfileItemsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProfileItemsQuery, ProfileItemsQueryVariables>(ProfileItemsDocument, options);
        }
export function useProfileItemsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProfileItemsQuery, ProfileItemsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProfileItemsQuery, ProfileItemsQueryVariables>(ProfileItemsDocument, options);
        }
export type ProfileItemsQueryHookResult = ReturnType<typeof useProfileItemsQuery>;
export type ProfileItemsLazyQueryHookResult = ReturnType<typeof useProfileItemsLazyQuery>;
export type ProfileItemsSuspenseQueryHookResult = ReturnType<typeof useProfileItemsSuspenseQuery>;
export type ProfileItemsQueryResult = Apollo.QueryResult<ProfileItemsQuery, ProfileItemsQueryVariables>;
export const ProfileRequestsDocument = gql`
    query ProfileRequests($pagination: PaginationInput!) {
  profileRequests(pagination: $pagination) {
    requests {
      id
      region
      description
      quantity
      startAt
      price
      pricingType
      paymentMethod
      createdAt
      status
      promotionExpiredAt
      category {
        name
        iconPath
      }
    }
    pages
  }
}
    `;

/**
 * __useProfileRequestsQuery__
 *
 * To run a query within a React component, call `useProfileRequestsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProfileRequestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfileRequestsQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useProfileRequestsQuery(baseOptions: Apollo.QueryHookOptions<ProfileRequestsQuery, ProfileRequestsQueryVariables> & ({ variables: ProfileRequestsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProfileRequestsQuery, ProfileRequestsQueryVariables>(ProfileRequestsDocument, options);
      }
export function useProfileRequestsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProfileRequestsQuery, ProfileRequestsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProfileRequestsQuery, ProfileRequestsQueryVariables>(ProfileRequestsDocument, options);
        }
export function useProfileRequestsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProfileRequestsQuery, ProfileRequestsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProfileRequestsQuery, ProfileRequestsQueryVariables>(ProfileRequestsDocument, options);
        }
export type ProfileRequestsQueryHookResult = ReturnType<typeof useProfileRequestsQuery>;
export type ProfileRequestsLazyQueryHookResult = ReturnType<typeof useProfileRequestsLazyQuery>;
export type ProfileRequestsSuspenseQueryHookResult = ReturnType<typeof useProfileRequestsSuspenseQuery>;
export type ProfileRequestsQueryResult = Apollo.QueryResult<ProfileRequestsQuery, ProfileRequestsQueryVariables>;
export const RequestForEditDocument = gql`
    query RequestForEdit($id: Int) {
  requestForEdit(id: $id) {
    request {
      region {
        label
        value
      }
      description
      phone
      price
      pricingType {
        label
        value
      }
      paymentMethod {
        label
        value
      }
      category {
        label
        value
      }
      quantity
      startAt
    }
    regions {
      label
      value
    }
    categories {
      label
      value
    }
  }
}
    `;

/**
 * __useRequestForEditQuery__
 *
 * To run a query within a React component, call `useRequestForEditQuery` and pass it any options that fit your needs.
 * When your component renders, `useRequestForEditQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRequestForEditQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRequestForEditQuery(baseOptions?: Apollo.QueryHookOptions<RequestForEditQuery, RequestForEditQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RequestForEditQuery, RequestForEditQueryVariables>(RequestForEditDocument, options);
      }
export function useRequestForEditLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RequestForEditQuery, RequestForEditQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RequestForEditQuery, RequestForEditQueryVariables>(RequestForEditDocument, options);
        }
export function useRequestForEditSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<RequestForEditQuery, RequestForEditQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<RequestForEditQuery, RequestForEditQueryVariables>(RequestForEditDocument, options);
        }
export type RequestForEditQueryHookResult = ReturnType<typeof useRequestForEditQuery>;
export type RequestForEditLazyQueryHookResult = ReturnType<typeof useRequestForEditLazyQuery>;
export type RequestForEditSuspenseQueryHookResult = ReturnType<typeof useRequestForEditSuspenseQuery>;
export type RequestForEditQueryResult = Apollo.QueryResult<RequestForEditQuery, RequestForEditQueryVariables>;
export const CurrentUserDocument = gql`
    query CurrentUser {
  currentUser {
    id
    name
    email
    avatarPath
    role
  }
}
    `;

/**
 * __useCurrentUserQuery__
 *
 * To run a query within a React component, call `useCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
      }
export function useCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
        }
export function useCurrentUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
        }
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export type CurrentUserLazyQueryHookResult = ReturnType<typeof useCurrentUserLazyQuery>;
export type CurrentUserSuspenseQueryHookResult = ReturnType<typeof useCurrentUserSuspenseQuery>;
export type CurrentUserQueryResult = Apollo.QueryResult<CurrentUserQuery, CurrentUserQueryVariables>;
export const ProfileDocument = gql`
    query Profile {
  profile {
    id
    name
    email
    avatarPath
    createdAt
    phone
    itemsCount
    requestsCount
  }
}
    `;

/**
 * __useProfileQuery__
 *
 * To run a query within a React component, call `useProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useProfileQuery(baseOptions?: Apollo.QueryHookOptions<ProfileQuery, ProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, options);
      }
export function useProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProfileQuery, ProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, options);
        }
export function useProfileSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProfileQuery, ProfileQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, options);
        }
export type ProfileQueryHookResult = ReturnType<typeof useProfileQuery>;
export type ProfileLazyQueryHookResult = ReturnType<typeof useProfileLazyQuery>;
export type ProfileSuspenseQueryHookResult = ReturnType<typeof useProfileSuspenseQuery>;
export type ProfileQueryResult = Apollo.QueryResult<ProfileQuery, ProfileQueryVariables>;
export const ProfileForEditDocument = gql`
    query ProfileForEdit {
  profileForEdit {
    name
    email
    phone
    avatarPath
  }
}
    `;

/**
 * __useProfileForEditQuery__
 *
 * To run a query within a React component, call `useProfileForEditQuery` and pass it any options that fit your needs.
 * When your component renders, `useProfileForEditQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfileForEditQuery({
 *   variables: {
 *   },
 * });
 */
export function useProfileForEditQuery(baseOptions?: Apollo.QueryHookOptions<ProfileForEditQuery, ProfileForEditQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProfileForEditQuery, ProfileForEditQueryVariables>(ProfileForEditDocument, options);
      }
export function useProfileForEditLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProfileForEditQuery, ProfileForEditQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProfileForEditQuery, ProfileForEditQueryVariables>(ProfileForEditDocument, options);
        }
export function useProfileForEditSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProfileForEditQuery, ProfileForEditQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProfileForEditQuery, ProfileForEditQueryVariables>(ProfileForEditDocument, options);
        }
export type ProfileForEditQueryHookResult = ReturnType<typeof useProfileForEditQuery>;
export type ProfileForEditLazyQueryHookResult = ReturnType<typeof useProfileForEditLazyQuery>;
export type ProfileForEditSuspenseQueryHookResult = ReturnType<typeof useProfileForEditSuspenseQuery>;
export type ProfileForEditQueryResult = Apollo.QueryResult<ProfileForEditQuery, ProfileForEditQueryVariables>;