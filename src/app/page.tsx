"use client";

import { useState } from "react";
import { IDKitWidget } from "@worldcoin/idkit";
import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { ethers } from "ethers";

export default function Home() {
  const [metadata, setMetadata] = useState({
    from: "0x76583bEA197881CC7b707ED3c4bAb3BAd12a769d",
    to: "0xA0F79412dcbEb6d9d1C2a49489c73995ab8f478F",
    weight: "10lb",
    length: "5in",
    width: "10in",
    height: "15in",
  });

  const [currentShipmentStatus, setCurrentShipmentStatus] = useState(0);

  function handleMetadataChange(key: any, val: any) {
    setMetadata({ ...metadata, [key]: val });
  }

  async function handleWorldId() {
    console.log("handleWorldId");
  }

  function handleVerify() {
    console.log("verify");
  }

  function onSuccess() {
    console.log("success");
  }

  function toggleShipmentStatus(shipmentId: number) {
    setCurrentShipmentStatus(shipmentId);
  }

  async function handleAttestation() {
    const EASContractAddress = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e"; // Sepolia v0.26
    const eas = new EAS(EASContractAddress);
    const provider = ethers.getDefaultProvider("sepolia");
    eas.connect(provider);

    // Initialize SchemaEncoder with the schema string

    const schemaEncoder = new SchemaEncoder("uint256 eventId, uint8 voteIndex");
    const encodedData = schemaEncoder.encodeData([
      { name: "eventId", value: 1, type: "uint256" },
      { name: "voteIndex", value: 1, type: "uint8" },
    ]);

    const schemaUID =
      "0xb16fa048b0d597f5a821747eba64efa4762ee5143e9a80600d0005386edfc995";

    const tx = await eas.attest({
      schema: schemaUID,
      data: {
        recipient: "0xFD50b031E778fAb33DfD2Fc3Ca66a1EeF0652165",
        // @ts-ignore
        expirationTime: 0,
        revocable: true,
        data: encodedData,
      },
    });

    const newAttestationUID = await tx.wait();

    console.log("New attestation UID:", newAttestationUID);
  }

  return (
    <main>
      <header className="border-b-2 border-b-blue-600 p-4">
        <nav className="flex">
          <div className="flex flex-1 text-xl">
            <span className="text-blue-600">chain</span>livery
          </div>
          <div className="flex">
            <ul className="mx-4">
              <li>
                <a className="underline">About</a>
              </li>
            </ul>
            <button className="">0xa0sdkf...</button>
          </div>
        </nav>
      </header>
      <div className="flex flex-wrap">
        <div className="w-full">
          <div className="p-4 m-4 border-2 border-gray-900 rounded-md">
            <h2 className="text-2xl text-center mb-4">Ship now</h2>

            <form>
              <div className="flex gap-8 justify-center mb-4">
                <div className="flex flex-col">
                  <label className="text-gray-200">From</label>
                  <input
                    placeholder="From"
                    className="rounded-md border border-gray-300 p-2 bg-transparent text-sm"
                    value={metadata.from}
                    onChange={(e) =>
                      handleMetadataChange("from", e.target.value)
                    }
                  />
                  <small className="text-gray-200">Ethereum address from</small>
                </div>
              </div>
              <div className="flex gap-8 justify-center mb-4">
                <div className="flex flex-col">
                  <label className="text-gray-200">To</label>
                  <input
                    placeholder="To"
                    className="rounded-md border border-gray-300 p-2 bg-transparent text-sm"
                    value={metadata.to}
                    onChange={(e) => handleMetadataChange("to", e.target.value)}
                  />
                  <small className="text-gray-200">Ethereum address to</small>
                </div>
              </div>

              <h3 className="text-xl text-center my-8">Shipment</h3>

              <div className="flex gap-8 justify-center mb-4">
                <div className="flex flex-col">
                  <label className="text-gray-200">Weight</label>
                  <input
                    placeholder="Weight"
                    className="rounded-md border border-gray-300 p-2 bg-transparent"
                    value={metadata.weight}
                    onChange={(e) =>
                      handleMetadataChange("weight", e.target.value)
                    }
                  />
                  <small>Weight and unit</small>
                </div>
                <div className="flex flex-col">
                  <label className="text-gray-200">Length</label>
                  <input
                    placeholder="Length"
                    className="rounded-md border border-gray-300 p-2 bg-transparent"
                    value={metadata.length}
                    onChange={(e) =>
                      handleMetadataChange("length", e.target.value)
                    }
                  />
                  <small>Length and unit</small>
                </div>
                <div className="flex flex-col">
                  <label className="text-gray-200">Width</label>
                  <input
                    placeholder="Width"
                    className="rounded-md border border-gray-300 p-2 bg-transparent"
                    value={metadata.width}
                    onChange={(e) =>
                      handleMetadataChange("width", e.target.value)
                    }
                  />
                  <small>Width and unit</small>
                </div>
                <div className="flex flex-col">
                  <label className="text-gray-200">Height</label>
                  <input
                    placeholder="Height"
                    className="rounded-md border border-gray-300 p-2 bg-transparent"
                    value={metadata.height}
                    onChange={(e) =>
                      handleMetadataChange("height", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="flex justify-center my-4">
                <button className="bg-blue-600 text-white font-semibold p-2 rounded-md border-2 border-gray-900">
                  Ship Now
                </button>
              </div>
            </form>
          </div>
          <div className="p-4 m-4 border-2 border-gray-900 rounded-md">
            <h2 className="text-2xl text-center mb-4">Shipments</h2>
            <div className="flex flex-col p-8 m-4 border-2 border-white w-96 rounded-md overflow-auto">
              <div className="flex w-full h-40 text-xl justify-center items-center">
                <span className="text-blue-600">chain</span>
                livery #1
              </div>
              <pre className="text-xs h-32 max-w-full whitespace-pre-wrap break-words">
                {JSON.stringify(metadata, null, 2)}
              </pre>
              <button
                onClick={() =>
                  toggleShipmentStatus(currentShipmentStatus > 0 ? 0 : 1)
                }
                className="bg-blue-600 w-1/3 self-end mt-8 text-white font-semibold p-2 rounded-md border-2 border-gray-900 text-xs"
              >
                Shipment status
              </button>
            </div>
          </div>
          {currentShipmentStatus > 0 && (
            <div className="p-4 m-4 border-2 border-gray-900 rounded-md">
              <h2 className="text-2xl text-center mb-4">Shipment Status</h2>
              <div className="flex flex-wrap justify-center">
                <div className="w-1/4">
                  <div className="m-2 p-4">
                    <div>
                      <img src="al" alt="" />
                      <p>
                        Pickup <span className="text-blue-400">Done</span>
                        <br />
                        <span className="text-xs">Aug 11, 2023 13:22</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-1/4">
                  <div className="m-2 p-4">
                    <div>
                      <img src="al" alt="" />
                      <p>
                        Transportation{" "}
                        <span className="text-blue-400">Done </span>
                        <br />
                        <span className="text-xs">Aug 11, 2023 15:02</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-1/4">
                  <div className="m-2 p-4">
                    <div>
                      <img src="al" alt="" />
                      <p>
                        Delivery attempt{" "}
                        <span className="text-green-400">In Progress </span>
                        <br />
                        <span className="text-xs">Aug 12, 2023 12:00</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-1/4">
                  <div className="m-2 p-4">
                    <div>
                      <img src="al" alt="" />
                      <p>
                        Completed{" "}
                        <span className="text-gray-400">Pending </span>
                        <br />
                        <span className="text-xs">-</span>
                      </p>
                    </div>
                  </div>
                </div>
                <IDKitWidget
                  app_id="app_staging_558db98dc211baf3231d30df0385c574" // obtained from the Developer Portal
                  action="nft1" // this is your action name from the Developer Portal
                  onSuccess={onSuccess} // callback when the modal is closed
                  handleVerify={handleVerify} // optional callback when the proof is received
                  enableTelemetry // optional, defaults to false
                >
                  {({ open }) => (
                    <button
                      onClick={open}
                      className="mx-auto bg-blue-600 text-white font-semibold p-2 rounded-md border-2 border-gray-900"
                    >
                      Complete Delivery
                    </button>
                  )}
                </IDKitWidget>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
