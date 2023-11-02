export type Fields = {
  address: string;
  professionalInformation: {
    employmentHistory: Array<{
      name: string;
      duration: string;
      role: string;
      duties: Array<string>;
    }>;
    jobPreference: {
      preferredTitle: string;
      industry: Array<string>;
      location: Array<string>;
      employmentType: Array<string>;
      salary: string;
    };
    workAuthorizationStatus: {
      citzenship: Array<string>;
      visaType: string;
      status: string;
    };
    profilePhoto: string | null;
    socialMedia: Array<string>;
    coverLetter: string;
    privacySPreferrence?: {
      notification: string;
    };
    optionalInformation: {
      website: string;
      references: Array<string>;
      languages: Array<string>;
    };
  };
};
