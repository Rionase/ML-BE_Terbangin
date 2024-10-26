require("dotenv").config();

const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const router = require("./routes");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(
    fileUpload({
        useTempFiles: true,
        /**
         * jangan dihapus atau di comment kalo pake GCP App Engine,
         * soalnya perlu akses write ke folder /tmp
         */
        tempFileDir: process.env.NODE_ENV === "development" ? "./tmp" : "/tmp",
    })
);

const httpServer = createServer(app);
const options = {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
};

const io = new Server(httpServer, options);

app.use(async function (req, res, next) {
    req.io = io;
    next();
});

app.use("/api/v1", router);

// error middleware
app.use((err, _, res, __) => {
    let statusCode = 500;
    let message = "Internal Server Error";
    console.log(err);

    if (err?.statusCode) {
        statusCode = err.statusCode;
    }
    if (err?.message) {
        message = err.message;
    }

    return res?.status(statusCode).json({
        data: null,
        message,
    });
});

// kalo routenya ga terdaftar
app.use("*", (_, res) => {
    res.status(404).json({
        data: null,
        message: "Route not found",
    });
});

io.on("connection", (socket) => {
    console.log(socket.id + " connected!");

    socket.on("disconnect", (reason) => {
        console.log(socket.id + " disconnected because " + reason);
    });
});

httpServer.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});
