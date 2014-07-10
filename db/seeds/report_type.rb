# Report Types
ReportType.attr_accessible :auth_required
reps = [
        {name:'default', auth_required: 0}
]
ReportType.create(reps)
