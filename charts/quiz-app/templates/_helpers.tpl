{{- define "quiz-app.fullname" -}}
{{- .Release.Name -}}
{{- end -}}

{{- define "quiz-app.labels" -}}
app.kubernetes.io/instance: {{ .Release.Name }}
app.kubernetes.io/part-of: quiz-app
{{- end -}}
