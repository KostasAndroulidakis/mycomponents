export interface Category {
  name: string;
  subcategories: Subcategory[];
}

export interface Subcategory {
  name: string;
  productTypes: string[];
}

export const CATEGORIES: Category[] = [
  {
    name: "Semiconductors",
    subcategories: [
      {
        name: "Discrete Semiconductors",
        productTypes: [
          "Diodes & Rectifiers",
          "Discrete & Power Modules",
          "Thyristors",
          "Transistors"
        ]
      },
      {
        name: "Embedded Processors & Controllers",
        productTypes: [
          "CPLD - Complex Programmable Logic Devices",
          "CPU - Central Processing Units",
          "Digital Signal Processors & Controllers - DSP, DSC",
          "EEPLD - Electronically Erasable Programmable Logic Devices",
          "FPGA - Configuration Memory",
          "FPGA - Field Programmable Gate Array",
          "Microcontrollers - MCU",
          "Microprocessors - MPU",
          "Processors - Application Specialised",
          "RF System on a Chip - SoC",
          "SPLD - Simple Programmable Logic Devices",
          "Systems on a Chip - SoC"
        ]
      },
      {
        name: "Integrated Circuits - ICs",
        productTypes: [
          "Active Filter",
          "Amplifier ICs",
          "Audio ICs",
          "Chipsets",
          "Clock & Timer ICs",
          "Communication & Networking ICs",
          "Counter ICs",
          "Data Converter ICs",
          "Digital Potentiometer ICs",
          "Driver ICs",
          "Embedded Processors & Controllers",
          "Equalisers",
          "Interface ICs",
          "Logic ICs",
          "Memory ICs",
          "Multimedia ICs",
          "Optocouplers/Photocouplers",
          "Power Management ICs",
          "Programmable Logic ICs",
          "Security ICs / Authentication ICs",
          "Switch ICs",
          "Wireless & RF Integrated Circuits"
        ]
      },
      {
        name: "Memory ICs",
        productTypes: [
          "DRAM",
          "EEPROM",
          "eMMC",
          "EPROM",
          "FIFO",
          "F-RAM",
          "Managed NAND",
          "Memory Controllers",
          "Memory IC Development Tools",
          "Memory Modules & Memory Cards",
          "MRAM",
          "Multichip Packages",
          "NAND Flash",
          "NOR Flash",
          "NVRAM",
          "SRAM",
          "Storage",
          "Universal Flash Storage - UFS"
        ]
      },
      {
        name: "Wireless & RF Semiconductors",
        productTypes: [
          "PIN Diodes",
          "RF Circulators",
          "RF Isolators",
          "Transistors RF",
          "Wireless & RF Integrated Circuits"
        ]
      }
    ]
  },
  {
    name: "Passive Components",
    subcategories: [
      {
        name: "Capacitors",
        productTypes: [
          "Ceramic Capacitor",
          "Electrolytic Capacitor"
        ]
      },
      {
        name: "Resistors",
        productTypes: [
          "Through-Hole Resistors",
          "Variable Resistor"
        ]
      },
      {
        name: "Potentiometers Trimmers & Rheostats",
        productTypes: [
          "Linear Slide Potentiometer",
          "Rotary Potentiometer"
        ]
      },
      {
        name: "Diodes",
        productTypes: [
          "Standard Rectifier"
        ]
      },
      {
        name: "Transistors",
        productTypes: [
          "NPN BJT"
        ]
      }
    ]
  },
  {
    name: "Electromechanical",
    subcategories: [
      {
        name: "Switches",
        productTypes: [
          "Tactile Switch"
        ]
      },
      {
        name: "Encoders",
        productTypes: [
          "Incremental Encoder"
        ]
      },
      {
        name: "Relays",
        productTypes: [
          "SPDT Relay"
        ]
      },
      {
        name: "Joysticks",
        productTypes: [
          "Analog Joystick"
        ]
      }
    ]
  },
  {
    name: "Engineering Development Tools",
    subcategories: [
      {
        name: "Embedded Processor Development Kits",
        productTypes: [
          "Development Board"
        ]
      }
    ]
  },
  {
    name: "Test & Measurement",
    subcategories: [
      {
        name: "Benchtop Power Supplies",
        productTypes: [
          "Benchtop Power Supply"
        ]
      },
      {
        name: "Multimeters & Voltmeters",
        productTypes: [
          "Digital Multimeter"
        ]
      }
    ]
  },
  {
    name: "Power",
    subcategories: [
      {
        name: "Power Supplies",
        productTypes: [
          "DC Module"
        ]
      },
      {
        name: "Batteries",
        productTypes: [
          "9V Battery"
        ]
      }
    ]
  },
  {
    name: "Tools & Supplies",
    subcategories: [
      {
        name: "Prototyping Products",
        productTypes: [
          "Solderless Breadboard",
          "Expansion Board"
        ]
      }
    ]
  },
  {
    name: "Wire & Cable",
    subcategories: [
      {
        name: "Cable Assemblies",
        productTypes: [
          "USB A to B Cable"
        ]
      },
      {
        name: "Jumper Wires",
        productTypes: [
          "DuPont Wire",
          "Breadboard Jumper"
        ]
      },
      {
        name: "Magnet Wire",
        productTypes: [
          "Enameled Copper Wire"
        ]
      }
    ]
  },
  {
    name: "Opto-electronics",
    subcategories: [
      {
        name: "Displays",
        productTypes: [
          "TFT LCD Display"
        ]
      }
    ]
  },
  {
    name: "Sensors",
    subcategories: [
      {
        name: "Distance Sensors",
        productTypes: [
          "Ultrasonic Sensor"
        ]
      },
      {
        name: "Temperature & Humidity Sensors",
        productTypes: [
          "Digital Sensor"
        ]
      },
      {
        name: "Tilt Sensors",
        productTypes: [
          "Tilt Switch"
        ]
      },
      {
        name: "IR Sensors",
        productTypes: [
          "IR Receiver"
        ]
      }
    ]
  },
  {
    name: "Actuators and Motors",
    subcategories: [
      {
        name: "Servos",
        productTypes: [
          "Micro Servo"
        ]
      },
      {
        name: "Stepper Motors",
        productTypes: [
          "Unipolar Stepper Motor"
        ]
      },
      {
        name: "Motor Drivers",
        productTypes: [
          "Stepper Driver"
        ]
      },
      {
        name: "Buzzers",
        productTypes: [
          "Active Buzzer",
          "Passive Buzzer"
        ]
      }
    ]
  },
  {
    name: "Display and Indicators",
    subcategories: [
      {
        name: "LCD Displays",
        productTypes: [
          "Character LCD"
        ]
      },
      {
        name: "7-Segment Displays",
        productTypes: [
          "1-Digit Display",
          "4-Digit Display"
        ]
      },
      {
        name: "LEDs",
        productTypes: [
          "Standard LED",
          "RGB LED"
        ]
      }
    ]
  },
  {
    name: "Input Components",
    subcategories: [
      {
        name: "Remotes",
        productTypes: [
          "IR Remote"
        ]
      }
    ]
  },
  {
    name: "Integrated Circuits",
    subcategories: [
      {
        name: "Logic ICs",
        productTypes: [
          "Shift Register"
        ]
      }
    ]
  }
];