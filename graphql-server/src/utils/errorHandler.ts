import { GraphQLError, GraphQLFormattedError } from "graphql";

const INTERNAL_CODE_NUM = 500;

export const errorHandler = (err: GraphQLError): GraphQLFormattedError => {
  const codeNum = err.extensions?.codeNum
    ? err.extensions!.codeNum
    : INTERNAL_CODE_NUM;
  const error = { ...err, extensions: { ...err.extensions, codeNum } };
  if (process.env.NODE_ENV !== "production") return error;
  return {
    message: err.message,
    extensions: { code: err.extensions.code, codeNum },
  };
};
