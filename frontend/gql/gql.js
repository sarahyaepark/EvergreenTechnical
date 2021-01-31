/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client';

export const GET_USER_QUERY = gql`
  query GetUser($id: Int!) {
    user(id: $id) {
      firstName
      lastName
      admin
    }
  }
`;

export const GET_VENDORS_QUERY = gql`
  query GetVendor {
    vendors {
      id
      name
      description
      externalLink
      category
      status
      risk
      tier
    }
  }
`;

export const GET_VENDORS_BY_CATEGORY = gql`
query GetVendorsByCategory($category: String!) {
  vendorsCategory(category: $category) {
    id
    name
    description
    externalLink
    category
    status
    risk
    tier
  }
}
`;

export const UPDATE_VENDOR_CATEGORY = gql`
  mutation updateVendorCategory($vendorId: Int!, $category: String!) {
    updateVendorCategory(vendorId: $vendorId, category: $category) {
      vendor {
        category
      }
    }
  }
`;

export const UPDATE_VENDOR_STATUS = gql`
  mutation updateVendorStatus($vendorId: Int!, $status: String!) {
    updateVendorStatus(vendorId: $vendorId, status: $status) {
      vendor {
        status
      }
    }
  }
`;