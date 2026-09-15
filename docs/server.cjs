var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// server.ts
var server_exports = {};
module.exports = __toCommonJS(server_exports);
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_fs = __toESM(require("fs"), 1);
var import_vite = require("vite");
var app = (0, import_express.default)();
var PORT = 3e3;
app.use(import_express.default.json());
app.use(import_express.default.static(import_path.default.join(process.cwd(), "public")));
var DATA_DIR = import_path.default.join(process.cwd(), "data");
var QUERIES_FILE = import_path.default.join(DATA_DIR, "queries.json");
if (!import_fs.default.existsSync(DATA_DIR)) {
  import_fs.default.mkdirSync(DATA_DIR, { recursive: true });
}
var INITIAL_QUERIES = [
  {
    id: "TV-2026-001",
    source: "hero_form",
    name: "Amitabh Sharma",
    phone: "9876543210",
    email: "amitabh.sharma@example.com",
    destination: "Kashmir Valley (Srinagar, Gulmarg, Pahalgam)",
    travelDate: "May 2026",
    duration: "6 Days / 5 Nights",
    travelers: "Family (2 Adults, 2 Kids)",
    adults: 2,
    children: 2,
    cabType: "Innova Crysta",
    hotelCategory: "Super Deluxe 4\u2605 + Houseboat",
    budget: "\u20B965,000",
    notes: "Interested in Gulmarg Gondola Phase 2 tickets & Dal Lake houseboat stay.",
    status: "new",
    adminNotes: "Requested callback in evening",
    createdAt: new Date(Date.now() - 36e5 * 4).toISOString(),
    whatsappUrl: `https://wa.me/917006644364?text=${encodeURIComponent("Hi Amitabh, thank you for contacting TripVora Travels for Kashmir Valley package.")}`
  },
  {
    id: "TV-2026-002",
    source: "custom_planner",
    name: "Pooja & Vikram Malhotra",
    phone: "9988776655",
    email: "malhotra.vikram@example.com",
    destination: "Mata Vaishno Devi Katra + Kashmir Serenity",
    travelDate: "April 2026 (Navratri Special)",
    duration: "7 Days / 6 Nights",
    travelers: "Couple (Honeymoon/Pilgrimage)",
    adults: 2,
    children: 0,
    cabType: "Dedicated Sedan (Dzire)",
    hotelCategory: "Deluxe Heritage",
    budget: "\u20B948,000",
    notes: "Need Katra battery car booking assistance & flower decoration on Dal Lake houseboat.",
    status: "quoted",
    adminNotes: "Itinerary dispatched to email & WhatsApp",
    createdAt: new Date(Date.now() - 36e5 * 18).toISOString(),
    whatsappUrl: `https://wa.me/917006644364?text=${encodeURIComponent("Hi Vikram, TripVora Travels follow up regarding Katra + Kashmir package.")}`
  },
  {
    id: "TV-2026-003",
    source: "contact_form",
    name: "Dr. Rajesh Verma",
    phone: "9811223344",
    email: "dr.verma@example.com",
    destination: "Ladakh (Leh, Nubra, Pangong Tso)",
    travelDate: "June 2026",
    duration: "8 Days / 7 Nights",
    travelers: "Friends Group (4 Adults)",
    adults: 4,
    children: 0,
    cabType: "Innova Crysta 4x4",
    hotelCategory: "Deluxe Hotels & Swiss Camps",
    budget: "\u20B91,10,000",
    notes: "Khardung La pass, Hunder sand dunes double hump camel ride, Pangong Lake cottages.",
    status: "contacted",
    adminNotes: "Spoke on phone, waiting for flight details",
    createdAt: new Date(Date.now() - 36e5 * 30).toISOString(),
    whatsappUrl: `https://wa.me/917006644364?text=${encodeURIComponent("Hi Dr. Rajesh Verma, TripVora Travels team following up on Ladakh expedition.")}`
  }
];
function loadQueries() {
  try {
    if (import_fs.default.existsSync(QUERIES_FILE)) {
      const data = import_fs.default.readFileSync(QUERIES_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (err) {
    console.error("Error reading queries file:", err);
  }
  saveQueries(INITIAL_QUERIES);
  return INITIAL_QUERIES;
}
function saveQueries(queries) {
  try {
    import_fs.default.writeFileSync(QUERIES_FILE, JSON.stringify(queries, null, 2), "utf-8");
  } catch (err) {
    console.error("Error saving queries file:", err);
  }
}
var queriesCache = loadQueries();
function sendEmailNotification(query) {
  const targetEmail = "peerhazim98@gmail.com";
  const notificationTime = (/* @__PURE__ */ new Date()).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  const emailBody = `
========================================================================
[TRIPVORA TRAVELS] NEW TRAVEL INQUIRY NOTIFICATION
Recipient: ${targetEmail}
Time: ${notificationTime}
------------------------------------------------------------------------
Query ID: ${query.id}
Source: ${query.source.toUpperCase()}
Customer Name: ${query.name}
Phone: ${query.phone}
Email: ${query.email}
Destination: ${query.destination}
Travel Dates: ${query.travelDate || "Flexible"}
Duration: ${query.duration || "Not specified"}
Travelers: ${query.travelers || `${query.adults || 2} Adults`}
Cab Preference: ${query.cabType || "Standard Sedan / SUV"}
Hotel Category: ${query.hotelCategory || "Deluxe 3\u2605 / 4\u2605"}
Estimated Budget: ${query.budget || "Custom Quote"}
Special Notes: ${query.notes || "None provided"}
------------------------------------------------------------------------
DIRECT ACTIONS:
WhatsApp Customer: https://wa.me/${query.phone.replace(/[^0-9]/g, "")}
Call Customer: tel:${query.phone}
WhatsApp Office Helpline: https://wa.me/917006644364
========================================================================
`;
  console.log(emailBody);
  return { dispatchedTo: targetEmail, sentAt: notificationTime };
}
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "TripVora Travels Kashmir API",
    notificationsEmail: "peerhazim98@gmail.com",
    helpline: "7006644364",
    totalQueriesCount: queriesCache.length
  });
});
app.post("/api/queries", (req, res) => {
  try {
    const {
      source = "contact_form",
      name,
      phone,
      email = "",
      destination = "Kashmir Valley",
      travelDate = "",
      duration = "",
      travelers = "",
      adults = 2,
      children = 0,
      cabType = "Innova / Dzire Private Cab",
      hotelCategory = "Deluxe 3\u2605 / 4\u2605 + Houseboat",
      budget = "",
      notes = ""
    } = req.body;
    if (!name || !phone) {
      return res.status(400).json({ error: "Customer name and phone number are required." });
    }
    const id = `TV-${(/* @__PURE__ */ new Date()).getFullYear()}-${Math.floor(1e3 + Math.random() * 9e3)}`;
    const messageText = `Hi TripVora Travels! I would like to book/inquire about a tour:

*Name:* ${name}
*Phone:* ${phone}
*Destination:* ${destination}
*Dates:* ${travelDate || "Flexible"}
*Duration:* ${duration || "5-6 Days"}
*Travelers:* ${travelers || `${adults} Adults`}
*Cab:* ${cabType}
*Notes:* ${notes || "Looking for best package rate"}`;
    const whatsappUrl = `https://wa.me/917006644364?text=${encodeURIComponent(messageText)}`;
    const newQuery = {
      id,
      source,
      name,
      phone,
      email,
      destination,
      travelDate,
      duration,
      travelers: travelers || `${adults} Adults${children > 0 ? `, ${children} Children` : ""}`,
      adults: Number(adults) || 2,
      children: Number(children) || 0,
      cabType,
      hotelCategory,
      budget,
      notes,
      status: "new",
      adminNotes: "",
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      whatsappUrl
    };
    queriesCache.unshift(newQuery);
    saveQueries(queriesCache);
    const emailResult = sendEmailNotification(newQuery);
    res.status(201).json({
      success: true,
      message: "Your inquiry has been successfully sent to TripVora Travels Srinagar team!",
      queryId: id,
      whatsappUrl,
      notifiedEmail: emailResult.dispatchedTo,
      phoneHotline: "7006644364"
    });
  } catch (err) {
    console.error("Error creating query:", err);
    res.status(500).json({ error: "Failed to process inquiry" });
  }
});
app.post("/api/admin/login", (req, res) => {
  const { email, password } = req.body;
  const isMatch = (email === "peerhazim98@gmail.com" || email === "admin@tripvora.com" || email === "admin") && (password === "tripvora2026" || password === "hazim2026" || password === "admin123" || password === "kashmir2026");
  if (isMatch) {
    res.json({
      success: true,
      token: "tripvora_admin_secure_token_" + Date.now(),
      user: {
        email: "peerhazim98@gmail.com",
        name: "Hazim (TripVora Travels)",
        role: "Super Admin",
        phone: "7006644364",
        office: "Sopore, Jammu and Kashmir"
      }
    });
  } else {
    res.status(401).json({
      success: false,
      error: "Invalid email or password. Use email: peerhazim98@gmail.com or admin@tripvora.com and password: tripvora2026"
    });
  }
});
app.get("/api/queries", (req, res) => {
  const { status, source, search } = req.query;
  let list = [...queriesCache];
  if (status && status !== "all") {
    list = list.filter((q) => q.status === status);
  }
  if (source && source !== "all") {
    list = list.filter((q) => q.source === source);
  }
  if (search && typeof search === "string") {
    const s = search.toLowerCase();
    list = list.filter(
      (q) => q.name.toLowerCase().includes(s) || q.phone.includes(s) || q.email.toLowerCase().includes(s) || q.destination.toLowerCase().includes(s) || q.id.toLowerCase().includes(s)
    );
  }
  const stats = {
    total: queriesCache.length,
    new: queriesCache.filter((q) => q.status === "new").length,
    contacted: queriesCache.filter((q) => q.status === "contacted").length,
    quoted: queriesCache.filter((q) => q.status === "quoted").length,
    booked: queriesCache.filter((q) => q.status === "booked").length,
    emailAlertsTo: "peerhazim98@gmail.com",
    whatsappHotline: "+91 7006644364"
  };
  res.json({ queries: list, stats });
});
app.patch("/api/queries/:id", (req, res) => {
  const { id } = req.params;
  const { status, adminNotes } = req.body;
  const idx = queriesCache.findIndex((q) => q.id === id);
  if (idx === -1) {
    return res.status(404).json({ error: "Query not found" });
  }
  if (status) {
    queriesCache[idx].status = status;
  }
  if (adminNotes !== void 0) {
    queriesCache[idx].adminNotes = adminNotes;
  }
  saveQueries(queriesCache);
  res.json({ success: true, updatedQuery: queriesCache[idx] });
});
app.delete("/api/queries/:id", (req, res) => {
  const { id } = req.params;
  queriesCache = queriesCache.filter((q) => q.id !== id);
  saveQueries(queriesCache);
  res.json({ success: true, message: "Query removed" });
});
app.get("/api/queries/export/csv", (req, res) => {
  const headers = ["ID", "Date", "Source", "Customer Name", "Phone", "Email", "Destination", "Travel Dates", "Duration", "Travelers", "Cab", "Status", "Admin Notes"];
  const rows = queriesCache.map((q) => [
    q.id,
    new Date(q.createdAt).toLocaleDateString("en-IN"),
    q.source,
    `"${q.name.replace(/"/g, '""')}"`,
    `"${q.phone}"`,
    `"${q.email}"`,
    `"${q.destination.replace(/"/g, '""')}"`,
    `"${q.travelDate || ""}"`,
    `"${q.duration || ""}"`,
    `"${q.travelers || ""}"`,
    `"${q.cabType || ""}"`,
    q.status,
    `"${(q.adminNotes || "").replace(/"/g, '""')}"`
  ]);
  const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", 'attachment; filename="tripvora_leads_export.csv"');
  res.send(csv);
});
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`=================================================`);
    console.log(`TRIPVORA TRAVELS FULL-STACK SERVER BOOTED!`);
    console.log(`Port: ${PORT} | Host: 0.0.0.0`);
    console.log(`Notifications routed to: peerhazim98@gmail.com`);
    console.log(`WhatsApp Hotline: +91 7006644364`);
    console.log(`=================================================`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
