const allowedOrigins = ["https://blogpost-adoc.onrender.com"];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else callback(new Error("Not Allowed by CORS"));
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
