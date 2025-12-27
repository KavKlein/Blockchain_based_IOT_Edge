const hre = require("hardhat");

async function main() {
  const contractAddress = "0x80ae0a06a8Ce97385DD9C60516Df65BB25E65a02"; // From deployment
  
  const IoTDataLogger = await hre.ethers.getContractFactory("IoTDataLogger");
  const contract = IoTDataLogger.attach(contractAddress);
  
  console.log("Testing IoTDataLogger contract...\n");
  
  // Test 1: Log some data
  console.log("📝 Logging test data...");
  const tx = await contract.logData(
    "ARDUINO_UNO_01",
    "temperature",
    2550, // 25.50°C (multiplied by 100)
    "SERIAL"
  );
  await tx.wait();
  console.log("✅ Data logged! TX:", tx.hash);
  
  // Test 2: Get data count
  const count = await contract.getDataCount();
  console.log("\n📊 Total data logs:", count.toString());
  
  // Test 3: Get latest data
  const latestData = await contract.getLatestData(1);
  console.log("\n🔍 Latest data entry:");
  console.log("  Node ID:", latestData[0].nodeId);
  console.log("  Data Type:", latestData[0].dataType);
  console.log("  Value:", latestData[0].value.toString());
  console.log("  Protocol:", latestData[0].protocol);
  console.log("  Timestamp:", new Date(Number(latestData[0].timestamp) * 1000).toLocaleString());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });