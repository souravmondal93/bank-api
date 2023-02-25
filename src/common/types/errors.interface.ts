interface BaseError {
  message: String;
}

export type GraphQLErrorsType = {
  errors: [BaseError];
}
