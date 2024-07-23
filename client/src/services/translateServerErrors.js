import _ from "lodash";

const translateServerErrors = (errors) => {
  if (errors.code === "P2002") {
    return { error: `The ${errors.target} used already exists in the database!` }
  }
};

export default translateServerErrors;
