interface EnergyUnit {
  activity: boolean;
  code: number | null;
  electricityModeId: number;
  electricityModeTitle: string;
  energyUnitTypeId: number;
  energyUnitTypeTitle: string;
  hasTransformer: boolean;
  id: number;
  inputOutputModeId: number;
  inputOutputModeTitle: string;
  measurePointId: number;
  measurePointTitle: string;
  name: string | null;
  num: number;
  productionTime: string | null;
  ratedPower: number;
  ratedPowerUnit: string | null;
  remark: string;
  scale: number;
  scaleUnit: string;
  sn: number | null;
  title: string;
  type: string | null;
  voltageLevelId: number;
  voltageLevelTitle: string;
}

interface SeasonPriceDetails {
  endTime: string
  id: number
  price: number
  priceRateId: number
  startTime: string
}

interface SeasonPrices {
  id: number;
  title: string;
  runMonth: string;
  runMonthTitle: string;
  priceRates: number[];
  seasonPriceDetails: SeasonPriceDetails[];
}

interface Cost {
  cityId: number | null;
  cityTitle: string | null;
  districtId: number | null;
  districtTitle: string | null;
  id: number;
  origin: boolean;
  property: string;
  provinceId: number | null;
  provinceTitle: string | null;
  title: string;
  voltageLevelsTitle: string;
  voltageLevels: number[];
  seasonPrices: SeasonPrices[];
  season: SeasonPrices[];
}

interface Generator {
  cityId: number | null
  cityTitle: string | null
  districtId: number | null
  districtTitle: string | null
  id: number
  origin: boolean
  provinceId: number | null
  provinceTitle: string | null
  pvPrice: number
  title: string
  windPrice: number
}

interface Price {
  cost: Cost[];
  generator: Generator;
}

export class Station {
  public address: string;
  public cityId: number;
  public cityTitle: string;
  public code: number;
  public costId: number;
  public description: string;
  public districtId: number;
  public districtTitle: string;
  public finalUserId: number;
  public finalUserTitle: string;
  public generatorId: number;
  public hasPrice: boolean | null;
  public id: number;
  public latitude: number;
  public longitude: number;
  public maintenanceId: number;
  public maintenanceTitle: string;
  public name: string | null;
  public operatorId: number;
  public operatorTitle: string;
  public productionTime: string;
  public provinceId: number | null;
  public provinceTitle: number | null;
  public ratedPower: number;
  public scale: number;
  public scaleUnit: string;
  public stationStatusId: number
  public stationStatusTime: string
  public stationStatusTitle: string
  public stationTypeId: number
  public stationTypeTitle: string
  public title: string
  public energyUnit?: EnergyUnit[];
  public energyUnitId?: number[];
  public photoFiles?: string[];
  public price?: Price;
  constructor(
    address: string, cityId: number, cityTitle: string, code: number,
    costId: number, description: string, districtId: number, districtTitle: string,
    finalUserId: number, finalUserTitle: string, generatorId: number,
    hasPrice: boolean | null, id: number, latitude: number, longitude: number,
    maintenanceId: number, maintenanceTitle: string, name: string | null,
    operatorId: number, operatorTitle: string, productionTime: string,
    provinceId: number | null, provinceTitle: number | null, ratedPower: number,
    scale: number, scaleUnit: string, stationStatusId: number,
    stationStatusTime: string, stationStatusTitle: string, stationTypeId: number,
    stationTypeTitle: string, title: string, energyUnit: EnergyUnit[],
    energyUnitId: number[], photoFiles: string[], price: Price
  ) {
    this.address = address;
    this.cityId = cityId;
    this.cityTitle = cityTitle;
    this.code = code;
    this.costId = costId;
    this.description = description;
    this.districtId = districtId;
    this.districtTitle = districtTitle;
    this.finalUserId = finalUserId;
    this.finalUserTitle = finalUserTitle;
    this.generatorId = generatorId;
    this.hasPrice = hasPrice;
    this.id = id;
    this.latitude = latitude;
    this.longitude = longitude;
    this.maintenanceId = maintenanceId;
    this.maintenanceTitle = maintenanceTitle;
    this.name = name;
    this.operatorId = operatorId;
    this.operatorTitle = operatorTitle;
    this.productionTime = productionTime;
    this.provinceId = provinceId;
    this.provinceTitle = provinceTitle;
    this.ratedPower = ratedPower;
    this.scaleUnit = scaleUnit;
    this.scale = scale;
    this.stationStatusId = stationStatusId;
    this.stationStatusTime = stationStatusTime;
    this.stationStatusTitle = stationStatusTitle;
    this.stationTypeId = stationTypeId;
    this.stationTypeTitle = stationTypeTitle;
    this.title = title;
    this.energyUnit = energyUnit;
    this.energyUnitId = energyUnitId;
    this.photoFiles = photoFiles;
    this.price = price;
  }
}