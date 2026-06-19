const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const User = require('./models/User');
const Category = require('./models/Category');
const Product = require('./models/Product');
const RepairService = require('./models/RepairService');

const seed = async () => {
  await connectDB();

  const admin = await User.create({
    firebaseUid: 'admin-placeholder-uid',
    name: 'ASSZ Admin',
    email: 'admin@assz.com',
    phone: '+8801700000000',
    role: 'admin',
  });
  console.log('Admin created:', admin.email);

  const categories = await Category.create([
    { name: 'Phone Accessories', slug: 'phone-accessories', type: 'product', icon: '📱' },
    { name: 'Laptop Accessories', slug: 'laptop-accessories', type: 'product', icon: '💻' },
    { name: 'Home Accessories', slug: 'home-accessories', type: 'product', icon: '🏠' },
    { name: 'Second-Hand Phones', slug: 'second-hand', type: 'product', icon: '🔄' },
    { name: 'Screen Repair', slug: 'screen-repair', type: 'repair', icon: '🔍' },
    { name: 'Battery Repair', slug: 'battery-repair', type: 'repair', icon: '🔋' },
    { name: 'Software Repair', slug: 'software-repair', type: 'repair', icon: '💻' },
    { name: 'Hardware Repair', slug: 'hardware-repair', type: 'repair', icon: '🔧' },
  ]);
  console.log(`${categories.length} categories created`);

  const phoneAcc = categories.find((c) => c.slug === 'phone-accessories')._id;
  const laptopAcc = categories.find((c) => c.slug === 'laptop-accessories')._id;
  const homeAcc = categories.find((c) => c.slug === 'home-accessories')._id;
  const secondHand = categories.find((c) => c.slug === 'second-hand')._id;

  const products = await Product.create([
    {
      name: 'iPhone 15 Pro Silicone Case',
      slug: 'iphone-15-pro-silicone-case',
      category: phoneAcc,
      brand: 'Apple',
      price: 2499,
      stock: 15,
      description: 'Genuine silicone case with soft-touch finish. Fits iPhone 15 Pro perfectly.',
      images: ['https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MT0X3?wid=400'],
      specs: { Material: 'Silicone', Color: 'Midnight', Weight: '32g' },
      condition: 'new',
    },
    {
      name: '20W USB-C Power Adapter',
      slug: '20w-usb-c-power-adapter',
      category: phoneAcc,
      brand: 'Apple',
      price: 1499,
      stock: 25,
      description: 'Fast charging USB-C power adapter. Compatible with iPhone and iPad.',
      images: [],
      specs: { Wattage: '20W', Port: 'USB-C', Compatible: 'iPhone 8+' },
      condition: 'new',
    },
    {
      name: 'AirPods Pro 2nd Gen',
      slug: 'airpods-pro-2nd-gen',
      category: phoneAcc,
      brand: 'Apple',
      price: 18999,
      discountPrice: 17499,
      stock: 8,
      description: 'Active Noise Cancellation, Adaptive Audio, Personalized Spatial Audio.',
      images: [],
      specs: { Battery: '6h listening', Chip: 'H2', WaterResistant: 'IPX4' },
      condition: 'new',
    },
    {
      name: 'MagSafe Charger',
      slug: 'magsafe-charger',
      category: phoneAcc,
      brand: 'Apple',
      price: 3499,
      stock: 12,
      description: 'Wireless magnetic charger. Fast charging compatible with iPhone 12+.',
      images: [],
      condition: 'new',
    },
    {
      name: 'iPhone Screen Protector Tempered Glass',
      slug: 'iphone-screen-protector-tempered-glass',
      category: phoneAcc,
      brand: 'Spigen',
      price: 599,
      stock: 50,
      description: '9H hardness tempered glass, oleophobic coating, anti-fingerprint.',
      images: [],
      specs: { Hardness: '9H', Thickness: '0.33mm', Feature: 'Anti-fingerprint' },
      condition: 'new',
    },
    {
      name: 'MacBook Pro USB-C Hub 7-in-1',
      slug: 'macbook-pro-usb-c-hub-7-in-1',
      category: laptopAcc,
      brand: 'Anker',
      price: 3499,
      stock: 10,
      description: '7-port USB-C hub with HDMI, SD card reader, USB-A, and more.',
      images: [],
      specs: { Ports: 'HDMI, USB-A x3, SD, USB-C PD', Material: 'Aluminum' },
      condition: 'new',
    },
    {
      name: 'Laptop Stand Adjustable Aluminum',
      slug: 'laptop-stand-adjustable-aluminum',
      category: laptopAcc,
      brand: 'Baseus',
      price: 2199,
      stock: 15,
      description: 'Ergonomic aluminum laptop stand. Adjustable height, foldable.',
      images: [],
      specs: { Material: 'Aluminum', HeightRange: '15-25cm', Weight: '400g' },
      condition: 'new',
    },
    {
      name: 'Wireless Bluetooth Mouse',
      slug: 'wireless-bluetooth-mouse',
      category: laptopAcc,
      brand: 'Logitech',
      price: 1799,
      stock: 20,
      description: 'Slim, quiet-click mouse. Connects via Bluetooth or USB receiver.',
      images: [],
      specs: { Connection: 'Bluetooth 5.0 / USB', Battery: '12 months', Silent: 'Yes' },
      condition: 'new',
    },
    {
      name: 'Smart LED Bulb WiFi',
      slug: 'smart-led-bulb-wifi',
      category: homeAcc,
      brand: 'Xiaomi',
      price: 899,
      stock: 30,
      description: 'WiFi-enabled RGB smart bulb. Works with Alexa and Google Home.',
      images: [],
      specs: { Wattage: '9W', Color: 'RGB + White', Protocol: 'WiFi 2.4GHz' },
      condition: 'new',
    },
    {
      name: 'USB Desk Fan',
      slug: 'usb-desk-fan',
      category: homeAcc,
      brand: 'Generic',
      price: 649,
      stock: 25,
      description: 'Quiet USB desk fan with adjustable speed. Perfect for desk or bedside.',
      images: [],
      specs: { Speed: '3 levels', Power: 'USB 5V', Noise: '<25dB' },
      condition: 'new',
    },
    {
      name: 'iPhone 13 Pro Max',
      slug: 'iphone-13-pro-max-second-hand',
      category: secondHand,
      brand: 'Apple',
      price: 54999,
      discountPrice: 49999,
      stock: 3,
      description: 'Pre-owned iPhone 13 Pro Max in excellent condition. Battery health 88%. Includes charger and case.',
      images: [],
      specs: { Storage: '256GB', Color: 'Sierra Blue', BatteryHealth: '88%' },
      isSecondHand: true,
      condition: 'used',
    },
    {
      name: 'iPhone 12',
      slug: 'iphone-12-second-hand',
      category: secondHand,
      brand: 'Apple',
      price: 32999,
      stock: 5,
      description: 'Pre-owned iPhone 12. Good condition with minor cosmetic wear. Fully functional.',
      images: [],
      specs: { Storage: '128GB', Color: 'Black', BatteryHealth: '85%' },
      isSecondHand: true,
      condition: 'used',
    },
    {
      name: 'iPad 9th Gen',
      slug: 'ipad-9th-gen-second-hand',
      category: secondHand,
      brand: 'Apple',
      price: 24999,
      stock: 2,
      description: 'Pre-owned iPad 9th generation. Great for students and media consumption.',
      images: [],
      specs: { Storage: '64GB', Color: 'Space Gray', Generation: '9th' },
      isSecondHand: true,
      condition: 'used',
    },
  ]);
  console.log(`${products.length} products created`);

  const repairServices = await RepairService.create([
    { name: 'iPhone Screen Repair', slug: 'iphone-screen-repair', deviceType: 'iPhone', category: 'screen', priceMin: 2500, priceMax: 8500, estTurnaroundMinutes: 45 },
    { name: 'iPhone Battery Replacement', slug: 'iphone-battery-replacement', deviceType: 'iPhone', category: 'battery', priceMin: 1800, priceMax: 3500, estTurnaroundMinutes: 30 },
    { name: 'iPhone Software Repair', slug: 'iphone-software-repair', deviceType: 'iPhone', category: 'software', priceMin: 800, priceMax: 2000, estTurnaroundMinutes: 60 },
    { name: 'iPhone Charging Port Repair', slug: 'iphone-charging-port-repair', deviceType: 'iPhone', category: 'charging-port', priceMin: 1500, priceMax: 3500, estTurnaroundMinutes: 60 },
    { name: 'iPhone Camera Replacement', slug: 'iphone-camera-replacement', deviceType: 'iPhone', category: 'rear-camera', priceMin: 2000, priceMax: 8000, estTurnaroundMinutes: 45 },
    { name: 'iPhone Water Damage Repair', slug: 'iphone-water-damage-repair', deviceType: 'iPhone', category: 'water-damage', priceMin: 3000, priceMax: 10000, estTurnaroundMinutes: 180 },
    { name: 'iPhone Back Glass Repair', slug: 'iphone-back-glass-repair', deviceType: 'iPhone', category: 'back-glass', priceMin: 2000, priceMax: 6000, estTurnaroundMinutes: 90 },
    { name: 'iPad Screen Repair', slug: 'ipad-screen-repair', deviceType: 'iPad', category: 'screen', priceMin: 3500, priceMax: 12000, estTurnaroundMinutes: 60 },
    { name: 'iPad Battery Replacement', slug: 'ipad-battery-replacement', deviceType: 'iPad', category: 'battery', priceMin: 2800, priceMax: 5000, estTurnaroundMinutes: 45 },
    { name: 'Mac Battery Replacement', slug: 'mac-battery-replacement', deviceType: 'Mac', category: 'battery', priceMin: 4500, priceMax: 9000, estTurnaroundMinutes: 90 },
    { name: 'Mac Software Repair', slug: 'mac-software-repair', deviceType: 'Mac', category: 'software', priceMin: 1500, priceMax: 4000, estTurnaroundMinutes: 90 },
    { name: 'Android Screen Replacement', slug: 'android-screen-replacement', deviceType: 'Android Phone', category: 'screen', priceMin: 1500, priceMax: 6000, estTurnaroundMinutes: 60 },
    { name: 'Android Battery Replacement', slug: 'android-battery-replacement', deviceType: 'Android Phone', category: 'battery', priceMin: 1200, priceMax: 3000, estTurnaroundMinutes: 30 },
    { name: 'Android Charging Port Repair', slug: 'android-charging-port-repair', deviceType: 'Android Phone', category: 'charging-port', priceMin: 1000, priceMax: 2500, estTurnaroundMinutes: 45 },
    { name: 'Android Front Camera Repair', slug: 'android-front-camera-repair', deviceType: 'Android Phone', category: 'front-camera', priceMin: 1200, priceMax: 3500, estTurnaroundMinutes: 45 },
    { name: 'Android Rear Camera Repair', slug: 'android-rear-camera-repair', deviceType: 'Android Phone', category: 'rear-camera', priceMin: 1500, priceMax: 4000, estTurnaroundMinutes: 45 },
    { name: 'Android Speaker Repair', slug: 'android-speaker-repair', deviceType: 'Android Phone', category: 'speaker', priceMin: 800, priceMax: 2000, estTurnaroundMinutes: 30 },
    { name: 'Android Microphone Repair', slug: 'android-microphone-repair', deviceType: 'Android Phone', category: 'microphone', priceMin: 800, priceMax: 1800, estTurnaroundMinutes: 30 },
    { name: 'Android Charging IC Repair', slug: 'android-charging-ic-repair', deviceType: 'Android Phone', category: 'charging-ic', priceMin: 1500, priceMax: 4000, estTurnaroundMinutes: 90 },
    { name: 'Android Power Button Repair', slug: 'android-power-button-repair', deviceType: 'Android Phone', category: 'power-button', priceMin: 800, priceMax: 2000, estTurnaroundMinutes: 30 },
    { name: 'Android Volume Button Repair', slug: 'android-volume-button-repair', deviceType: 'Android Phone', category: 'volume-button', priceMin: 800, priceMax: 2000, estTurnaroundMinutes: 30 },
    { name: 'Android Fingerprint Sensor Repair', slug: 'android-fingerprint-sensor-repair', deviceType: 'Android Phone', category: 'fingerprint-sensor', priceMin: 1200, priceMax: 3000, estTurnaroundMinutes: 45 },
    { name: 'Android Water Damage Repair', slug: 'android-water-damage-repair', deviceType: 'Android Phone', category: 'water-damage', priceMin: 2000, priceMax: 8000, estTurnaroundMinutes: 180 },
    { name: 'Android Software Repair', slug: 'android-software-repair', deviceType: 'Android Phone', category: 'software', priceMin: 500, priceMax: 2000, estTurnaroundMinutes: 60 },
    { name: 'Android Data Recovery', slug: 'android-data-recovery', deviceType: 'Android Phone', category: 'data-recovery', priceMin: 1500, priceMax: 5000, estTurnaroundMinutes: 120 },
    { name: 'Android OS Reinstall', slug: 'android-os-reinstall', deviceType: 'Android Phone', category: 'os-reinstall', priceMin: 800, priceMax: 2500, estTurnaroundMinutes: 90 },
    { name: 'Android Unlock Service', slug: 'android-unlock-service', deviceType: 'Android Phone', category: 'unlock', priceMin: 500, priceMax: 3000, estTurnaroundMinutes: 30 },
    { name: 'Android Back Glass Repair', slug: 'android-back-glass-repair', deviceType: 'Android Phone', category: 'back-glass', priceMin: 1000, priceMax: 3500, estTurnaroundMinutes: 60 },
    { name: 'Android Motherboard Repair', slug: 'android-motherboard-repair', deviceType: 'Android Phone', category: 'motherboard', priceMin: 2000, priceMax: 10000, estTurnaroundMinutes: 180 },
    { name: 'Laptop Keyboard Replacement', slug: 'laptop-keyboard-replacement', deviceType: 'Laptop', category: 'keyboard', priceMin: 1500, priceMax: 5000, estTurnaroundMinutes: 60 },
    { name: 'Laptop Screen Repair', slug: 'laptop-screen-repair', deviceType: 'Laptop', category: 'display', priceMin: 3000, priceMax: 15000, estTurnaroundMinutes: 90 },
    { name: 'Laptop Battery Replacement', slug: 'laptop-battery-replacement', deviceType: 'Laptop', category: 'battery', priceMin: 2500, priceMax: 8000, estTurnaroundMinutes: 45 },
    { name: 'Laptop Hinge Repair', slug: 'laptop-hinge-repair', deviceType: 'Laptop', category: 'hinge', priceMin: 1200, priceMax: 4000, estTurnaroundMinutes: 60 },
    { name: 'Laptop Fan Replacement', slug: 'laptop-fan-replacement', deviceType: 'Laptop', category: 'fan', priceMin: 1000, priceMax: 3000, estTurnaroundMinutes: 45 },
    { name: 'Laptop Thermal Paste', slug: 'laptop-thermal-paste', deviceType: 'Laptop', category: 'thermal-paste', priceMin: 500, priceMax: 1500, estTurnaroundMinutes: 30 },
    { name: 'MacBook Screen Repair', slug: 'macbook-screen-repair', deviceType: 'MacBook', category: 'display', priceMin: 8000, priceMax: 35000, estTurnaroundMinutes: 120 },
    { name: 'MacBook Keyboard Repair', slug: 'macbook-keyboard-repair', deviceType: 'MacBook', category: 'keyboard', priceMin: 5000, priceMax: 15000, estTurnaroundMinutes: 90 },
    { name: 'MacBook Trackpad Repair', slug: 'macbook-trackpad-repair', deviceType: 'MacBook', category: 'trackpad', priceMin: 4000, priceMax: 12000, estTurnaroundMinutes: 60 },
  ]);
  console.log(`${repairServices.length} repair services created`);

  await mongoose.disconnect();
  console.log('Seed complete!');
  process.exit(0);
};

seed().catch((err) => {
  console.error('Seed error:', err);
  process.exit(1);
});
