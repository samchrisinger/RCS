MetricType.attr_accessible :min, :max, :name
ReportType.attr_accessible :auth_required
User.attr_accessible :admin, :guardian, :token
Observation.attr_accessible :user_id
Metric.attr_accessible :observation_id, :metric_type_id
News.attr_accessible :user_id, :for
