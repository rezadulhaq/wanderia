import gql from "graphql-tag";

export const PARTNERS_QUERY = gql`
  query Query {
    allPartnerBusiness {
      id
      name
      latitude
      longitude
      description
      mapUrl
      CategoryId
      PartnerId
      status
      imageUrl
    }
  }
`;

export const PARTNERS_BUSINESS_QUERY = gql`
  query Query($access_token: String) {
    partnerBusiness(access_token: $access_token) {
      id
      name
      latitude
      longitude
      description
      mapUrl
      CategoryId
      PartnerId
      status
      imageUrl
    }
  }
`;

export const ONE_BUSINESS = gql`
  query Query($onePartnerBusinessId: ID) {
    onePartnerBusiness(id: $onePartnerBusinessId) {
      id
      name
      latitude
      longitude
      description
      mapUrl
      CategoryId
      PartnerId
      status
      imageUrl
  }
}
`
