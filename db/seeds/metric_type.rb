# Metric Types
MetricType.attr_accessible :min, :max, :name
mets = [
        {name:'pH', type: 'float', min: 0, max: 0},
        {name:'precipitation description', type: 'float'},
        {name:'land description', type: 'float'},
        {name:'turbidity (NTU)', type: 'float'},
        {name:'water temperature (C)', type: 'float',min: -30, max: 80},
        {name:'dissolved oxygen (ppm)', type: 'float'},
        {name:'air temperature (C)', type: 'float',min: -30, max: 80},
        {name:'river flow', type: 'string'},
        {name:'water color', type: 'string'},
        {name:'water odor', type: 'string'}        
]
MetricType.create(mets)
