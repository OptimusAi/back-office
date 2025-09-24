export const formatRegions = (regions) => {
  let canadianRegions = regions.filter((region) => region.countryCode === 'CA');
  let usaRegions = regions.filter((region) => region.countryCode === 'US');

  canadianRegions.sort((a, b) => (a.name > b.name ? 1 : -1));
  usaRegions.sort((a, b) => (a.name > b.name ? 1 : -1));
  const mappedCanadianRegions = canadianRegions.map((region) => ({
    id: region.code,
    ...region,
  }));
  const mappedUsaRegions = usaRegions.map((region) => ({
    id: region.code,
    ...region,
  }));

  return [...mappedCanadianRegions, ...mappedUsaRegions];
};

export const formatZones = (zoneList) => {
  zoneList = zoneList.map((zone) => ({
    id: zone.zone,
    ...zone,
  }));
  const sortedList = zoneList.sort((a, b) =>
    parseInt(a.zone) > parseInt(b.zone) ? 1 : -1
  );
  return sortedList;
};
