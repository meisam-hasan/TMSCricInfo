import moment from "moment";

const getPlayerAge = (dob) => {
    const startDate = moment(dob);
    const endDate = moment(new Date());

    // Calculate difference in years and remaining days
    const years = endDate.diff(startDate, "years");
    const adjustedStartDate = moment(startDate).add(years, "years");
    const remainingDays = endDate.diff(adjustedStartDate, "days");

    // Format the output
    return `${years} years${
        remainingDays > 0 ? ` and ${remainingDays} days` : ""
    }`;
};

export { getPlayerAge };
