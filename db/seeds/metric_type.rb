# Metric Types
MetricType.attr_accessible :min, :max, :name
mets = [
        {name:'pH', min: 0, max: 0},
        {name:'precipitation description'},
        {name:'land description'},
        {name:'turbidity (NTU)'},
        {name:'water temperature (C)',min: -30, max: 80},
        {name:'dissolved oxygen (ppm)'},
        {name:'air temperature (C)',min: -30, max: 80},
]
MetricType.create(mets)
