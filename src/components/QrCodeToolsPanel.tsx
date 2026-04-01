"use client";

import { useEffect, useMemo, useState } from "react";
import NextImage from "next/image";
import QRCode from "qrcode";

type QrType =
  | "url"
  | "vcard"
  | "text"
  | "email"
  | "sms"
  | "wifi"
  | "bitcoin"
  | "facebook"
  | "pdf"
  | "mp3"
  | "apps"
  | "image";

type FrameOption = {
  id: string;
  label: string;
  className: string;
};

const QR_TYPES: Array<{ id: QrType; label: string }> = [
  { id: "url", label: "URL" },
  { id: "vcard", label: "vCard" },
  { id: "text", label: "Text" },
  { id: "email", label: "E-mail" },
  { id: "sms", label: "SMS" },
  { id: "wifi", label: "Wifi" },
  { id: "bitcoin", label: "Bitcoin" },
  { id: "facebook", label: "Facebook" },
  { id: "pdf", label: "PDF" },
  { id: "mp3", label: "MP3" },
  { id: "apps", label: "App stores" },
  { id: "image", label: "Image" },
];

const FRAME_OPTIONS: FrameOption[] = [
  { id: "scan-top", label: "Scan me frame on a QR Code", className: "scan-top" },
  { id: "bubble-top", label: "Bubble frame with scan me text at the top of a QR Code", className: "bubble-top" },
  {
    id: "bubble-bottom",
    label: "Bubble frame with scan me text at the bottom of a QR Code",
    className: "bubble-bottom",
  },
  {
    id: "video-play",
    label: "Frame with video play button detail and scan me text at the bottom of a QR Code",
    className: "video-play",
  },
  {
    id: "envelope",
    label: "Envelope frame with scan me text and a QR Code coming out of it",
    className: "envelope",
  },
  {
    id: "arrow",
    label: "Scan me text under a QR Code with an arrow pointing to it",
    className: "arrow",
  },
  {
    id: "outline",
    label: "Scan me text under a QR Code with a black outline",
    className: "outline",
  },
  {
    id: "shopping-bag",
    label: "Shopping bag frame with scan me text surrounding a QR Code",
    className: "shopping-bag",
  },
  {
    id: "banner",
    label: "Banner frame with scan me text at the bottom of a QR Code",
    className: "banner",
  },
];

function buildVCard(name: string, phone: string, email: string, company: string): string {
  return [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${name}`,
    company ? `ORG:${company}` : "",
    phone ? `TEL:${phone}` : "",
    email ? `EMAIL:${email}` : "",
    "END:VCARD",
  ]
    .filter(Boolean)
    .join("\n");
}

export default function QrCodeToolsPanel() {
  const [qrType, setQrType] = useState<QrType>("url");
  const [frameId, setFrameId] = useState<string>(FRAME_OPTIONS[0].id);
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [error, setError] = useState("");

  const [inputValue, setInputValue] = useState("https://example.com");
  const [textValue, setTextValue] = useState("Hello from Daxnoria QR");

  const [vcardName, setVcardName] = useState("Daxnoria Team");
  const [vcardPhone, setVcardPhone] = useState("+84 900 000 000");
  const [vcardEmail, setVcardEmail] = useState("team@daxnoria.dev");
  const [vcardCompany, setVcardCompany] = useState("Daxnoria");

  const [emailTo, setEmailTo] = useState("hello@example.com");
  const [emailSubject, setEmailSubject] = useState("Quick note");
  const [emailBody, setEmailBody] = useState("Hello from Daxnoria.");

  const [smsPhone, setSmsPhone] = useState("+84900000000");
  const [smsBody, setSmsBody] = useState("Hi there");

  const [wifiSsid, setWifiSsid] = useState("MyWifi");
  const [wifiPassword, setWifiPassword] = useState("12345678");
  const [wifiSecurity, setWifiSecurity] = useState("WPA");

  const [bitcoinAddress, setBitcoinAddress] = useState("1BoatSLRHtKNngkdXEeobR76b53LETtpyT");
  const [bitcoinAmount, setBitcoinAmount] = useState("0.001");

  const [iosStoreUrl, setIosStoreUrl] = useState("https://apps.apple.com/us/app/example/id000000000");
  const [androidStoreUrl, setAndroidStoreUrl] = useState("https://play.google.com/store/apps/details?id=com.example.app");

  const [uploadedFileLabel, setUploadedFileLabel] = useState("");

  const payload = useMemo(() => {
    if (qrType === "url" || qrType === "pdf" || qrType === "mp3" || qrType === "facebook" || qrType === "image") {
      return inputValue.trim();
    }

    if (qrType === "text") {
      return textValue;
    }

    if (qrType === "vcard") {
      return buildVCard(vcardName.trim(), vcardPhone.trim(), vcardEmail.trim(), vcardCompany.trim());
    }

    if (qrType === "email") {
      const params = new URLSearchParams({
        subject: emailSubject,
        body: emailBody,
      });
      return `mailto:${emailTo}?${params.toString()}`;
    }

    if (qrType === "sms") {
      return `SMSTO:${smsPhone}:${smsBody}`;
    }

    if (qrType === "wifi") {
      return `WIFI:T:${wifiSecurity};S:${wifiSsid};P:${wifiPassword};;`;
    }

    if (qrType === "bitcoin") {
      return `bitcoin:${bitcoinAddress}?amount=${bitcoinAmount}`;
    }

    return `iOS: ${iosStoreUrl}\nAndroid: ${androidStoreUrl}`;
  }, [
    androidStoreUrl,
    bitcoinAddress,
    bitcoinAmount,
    emailBody,
    emailSubject,
    emailTo,
    inputValue,
    iosStoreUrl,
    qrType,
    smsBody,
    smsPhone,
    textValue,
    vcardCompany,
    vcardEmail,
    vcardName,
    vcardPhone,
    wifiPassword,
    wifiSecurity,
    wifiSsid,
  ]);

  const selectedFrame = FRAME_OPTIONS.find((frame) => frame.id === frameId) ?? FRAME_OPTIONS[0];

  useEffect(() => {
    let cancelled = false;

    async function generateQr() {
      setError("");

      if (!payload.trim()) {
        setQrDataUrl("");
        return;
      }

      try {
        const data = await QRCode.toDataURL(payload, {
          width: 480,
          margin: 1,
          color: {
            dark: "#0f172a",
            light: "#ffffff",
          },
        });

        if (!cancelled) {
          setQrDataUrl(data);
        }
      } catch (qrError) {
        if (!cancelled) {
          setQrDataUrl("");
          setError(qrError instanceof Error ? qrError.message : "Unable to generate QR code");
        }
      }
    }

    void generateQr();

    return () => {
      cancelled = true;
    };
  }, [payload]);

  function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setUploadedFileLabel(`${file.name} (${(file.size / 1024).toFixed(1)} KB)`);

    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : "";
      if (result) {
        setInputValue(result);
      }
    };
    reader.readAsDataURL(file);
  }

  function renderInputByType() {
    if (qrType === "vcard") {
      return (
        <div className="two-col-fields">
          <label className="field">
            <span>Full name</span>
            <input value={vcardName} onChange={(event) => setVcardName(event.target.value)} />
          </label>
          <label className="field">
            <span>Phone</span>
            <input value={vcardPhone} onChange={(event) => setVcardPhone(event.target.value)} />
          </label>
          <label className="field">
            <span>Email</span>
            <input value={vcardEmail} onChange={(event) => setVcardEmail(event.target.value)} />
          </label>
          <label className="field">
            <span>Company</span>
            <input value={vcardCompany} onChange={(event) => setVcardCompany(event.target.value)} />
          </label>
        </div>
      );
    }

    if (qrType === "email") {
      return (
        <>
          <div className="two-col-fields">
            <label className="field">
              <span>To</span>
              <input value={emailTo} onChange={(event) => setEmailTo(event.target.value)} />
            </label>
            <label className="field">
              <span>Subject</span>
              <input value={emailSubject} onChange={(event) => setEmailSubject(event.target.value)} />
            </label>
          </div>
          <label className="field">
            <span>Body</span>
            <textarea value={emailBody} onChange={(event) => setEmailBody(event.target.value)} />
          </label>
        </>
      );
    }

    if (qrType === "sms") {
      return (
        <>
          <label className="field">
            <span>Phone number</span>
            <input value={smsPhone} onChange={(event) => setSmsPhone(event.target.value)} />
          </label>
          <label className="field">
            <span>Message</span>
            <textarea value={smsBody} onChange={(event) => setSmsBody(event.target.value)} />
          </label>
        </>
      );
    }

    if (qrType === "wifi") {
      return (
        <div className="two-col-fields">
          <label className="field">
            <span>SSID</span>
            <input value={wifiSsid} onChange={(event) => setWifiSsid(event.target.value)} />
          </label>
          <label className="field">
            <span>Password</span>
            <input value={wifiPassword} onChange={(event) => setWifiPassword(event.target.value)} />
          </label>
          <label className="field">
            <span>Security</span>
            <select value={wifiSecurity} onChange={(event) => setWifiSecurity(event.target.value)}>
              <option value="WPA">WPA</option>
              <option value="WEP">WEP</option>
              <option value="nopass">No password</option>
            </select>
          </label>
        </div>
      );
    }

    if (qrType === "bitcoin") {
      return (
        <div className="two-col-fields">
          <label className="field">
            <span>Wallet address</span>
            <input value={bitcoinAddress} onChange={(event) => setBitcoinAddress(event.target.value)} />
          </label>
          <label className="field">
            <span>Amount (BTC)</span>
            <input value={bitcoinAmount} onChange={(event) => setBitcoinAmount(event.target.value)} />
          </label>
        </div>
      );
    }

    if (qrType === "apps") {
      return (
        <div className="two-col-fields">
          <label className="field">
            <span>Apple App Store URL</span>
            <input value={iosStoreUrl} onChange={(event) => setIosStoreUrl(event.target.value)} />
          </label>
          <label className="field">
            <span>Google Play URL</span>
            <input value={androidStoreUrl} onChange={(event) => setAndroidStoreUrl(event.target.value)} />
          </label>
        </div>
      );
    }

    if (qrType === "text") {
      return (
        <label className="field">
          <span>Text</span>
          <textarea value={textValue} onChange={(event) => setTextValue(event.target.value)} />
        </label>
      );
    }

    return (
      <label className="field">
        <span>Enter your website, text or drop a file here</span>
        <input
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          placeholder="https://example.com"
        />
      </label>
    );
  }

  return (
    <section className="tool-shell utility-shell qr-shell">
      <div className="panel-head">
        <div>
          <p className="eyebrow">QR Code Generator</p>
          <h2>Create your QR code for free</h2>
          <p className="panel-subtext">Your QR code is generated automatically as you update content.</p>
        </div>
      </div>

      <div className="qr-type-tabs" role="tablist" aria-label="QR type">
        {QR_TYPES.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={qrType === item.id}
            className={`qr-tab ${qrType === item.id ? "is-active" : ""}`}
            onClick={() => setQrType(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="qr-layout">
        <div className="editor-card">
          {renderInputByType()}
          <p className="hint">(Your QR Code will be generated automatically)</p>

          <label className="field">
            <span>Upload any file (.jpg, .pdf, .mp3, .docx, .pptx)</span>
            <input type="file" onChange={handleFileUpload} />
          </label>
          {uploadedFileLabel ? <p className="hint">Uploaded: {uploadedFileLabel}</p> : null}
        </div>

        <div className="editor-card">
          <p>Generated QR code</p>
          {qrDataUrl ? (
            <div className={`qr-frame ${selectedFrame.className}`}>
              <div className="qr-frame-label">Scan me</div>
              <NextImage
                src={qrDataUrl}
                alt="Generated QR code"
                className="qr-image"
                width={250}
                height={250}
                unoptimized
              />
            </div>
          ) : (
            <p className="hint">Enter valid data to generate a QR code.</p>
          )}
          {qrDataUrl ? (
            <div className="result-actions">
              <a href={qrDataUrl} download="generated-qr.png" className="btn primary download-btn">
                Download QR code
              </a>
            </div>
          ) : null}
          {error ? <p className="error">{error}</p> : null}
        </div>
      </div>

      <div className="editor-card">
        <p>New Frames!</p>
        <div className="qr-frames-list">
          {FRAME_OPTIONS.map((frame) => (
            <button
              key={frame.id}
              type="button"
              className={`frame-option ${frameId === frame.id ? "is-active" : ""}`}
              onClick={() => setFrameId(frame.id)}
            >
              {frame.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
