const hre = require("hardhat");

async function main() {
  console.log("Deploying IoTDataLogger contract...");
  
  // Get the contract factory
  const IoTDataLogger = await hre.ethers.getContractFactory("IoTDataLogger");
  
  // Deploy the contract
  const iotLogger = await IoTDataLogger.deploy();
  
  await iotLogger.waitForDeployment();
  
  const address = await iotLogger.getAddress();
  
  console.log("✅ IoTDataLogger deployed to:", address);
  console.log("\n📝 Save this address for your gateway service!");
  console.log("\n🔑 Contract owner:", await iotLogger.owner());
  
  // Save deployment info
  const fs = require('fs');
  const deploymentInfo = {
    contractAddress: address,
    network: hre.network.name,
    deployer: (await hre.ethers.getSigners())[0].address,
    timestamp: new Date().toISOString()
  };
  
  fs.writeFileSync(
    'deployment-info.json',
    JSON.stringify(deploymentInfo, null, 2)
  );
  
  console.log("\n💾 Deployment info saved to deployment-info.json");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });