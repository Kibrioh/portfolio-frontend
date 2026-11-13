import { projectCategoryId, projectScreenshotVariant } from '../components/Projects.jsx'

export function projectWalkthroughSteps(project) {
  const title = project.title.toLowerCase()
  const category = projectCategoryId(project.category)
  if (category === 'web-application-development' && /(point of sale|\bpos\b|inventory)/.test(title)) return [
    { title: 'Set up the product catalogue', description: 'Review product details, stock levels, and the fields used by the sales workspace.', screenTitle: 'Inventory catalogue', variant: 'table' },
    { title: 'Open a sales transaction', description: 'Select items, quantities, and payment details in a sample checkout flow.', screenTitle: 'New sale', variant: 'dashboard' },
    { title: 'Update inventory records', description: 'Follow how completed transactions are reflected in stock and activity records.', screenTitle: 'Stock movement', variant: 'table' },
    { title: 'Review business performance', description: 'Explore a sample summary of sales, stock, and transaction activity.', screenTitle: 'Business overview', variant: 'chart' },
  ]
  if (title.includes('flood') && category === 'web-application-development') return [
    { title: 'Review incoming conditions', description: 'View sample rainfall and river-level readings alongside the latest warning status.', screenTitle: 'Warning overview', variant: 'dashboard' },
    { title: 'Check threshold status', description: 'Compare sample readings with configured warning thresholds and review the resulting alert level.', screenTitle: 'Threshold monitoring', variant: 'chart' },
    { title: 'Identify affected communities', description: 'Explore a sample map and community list for locations that may need attention.', screenTitle: 'Affected locations', variant: 'map' },
    { title: 'Coordinate response actions', description: 'Review a sample alert queue and the response actions associated with each location.', screenTitle: 'Response coordination', variant: 'table' },
  ]
  if (category === 'gis-software-development') return [
    { title: 'Load spatial data layers', description: 'Inspect sample settlement, road, facility, and hazard layers before analysis.', screenTitle: 'Map layer workspace', variant: 'table' },
    { title: 'Explore geographic coverage', description: 'Review the study area, mapped features, and locations that intersect the scenario boundary.', screenTitle: 'Geographic overview', variant: 'map' },
    { title: 'Evaluate spatial relationships', description: 'Compare sample exposure and proximity results across the mapped area.', screenTitle: 'Spatial analysis', variant: 'chart' },
    { title: 'Prepare a response map', description: 'Review a sample map layout and the key information prepared for sharing.', screenTitle: 'Map output', variant: 'map' },
  ]
  if (category === 'spatial-data-science') return [
    { title: 'Prepare analysis inputs', description: 'Review a sample table of variables, locations, and quality checks before analysis.', screenTitle: 'Analysis dataset', variant: 'table' },
    { title: 'Explore spatial patterns', description: 'Inspect how sample observations are distributed across the study area.', screenTitle: 'Spatial distribution', variant: 'map' },
    { title: 'Compare model outputs', description: 'Explore illustrative charts showing how the analysis results vary by area.', screenTitle: 'Model results', variant: 'chart' },
    { title: 'Summarize findings', description: 'Review a sample dashboard that brings key indicators and interpretation together.', screenTitle: 'Analysis summary', variant: 'dashboard' },
  ]
  return [
    { title: 'Review the project workspace', description: 'Start with a sample overview of the project data and its current status.', screenTitle: 'Project overview', variant: 'dashboard' },
    { title: 'Inspect the working dataset', description: 'Review sample records and the information used in the project workflow.', screenTitle: 'Working dataset', variant: 'table' },
    { title: 'Explore the analysis', description: 'Inspect an illustrative map or chart showing one way the project output can be explored.', screenTitle: 'Analysis view', variant: projectScreenshotVariant(project, 2) },
    { title: 'Review the results', description: 'Bring the example outputs together in a concise summary for the next decision.', screenTitle: 'Results summary', variant: 'chart' },
  ]
}

