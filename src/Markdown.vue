<template>
  <textarea></textarea>
</template>

<script>
import SimpleMDE from 'simplemde';
import 'simplemde/dist/simplemde.min.js';
import 'simplemde/dist/simplemde.min.css';
import 'inline-attachment/src/inline-attachment';
import 'inline-attachment/src/codemirror-4.inline-attachment';

export default {
	name: 'Markdown-Editor',

	vModel: true,

	props: {
		simpleMdeConfig: Object,
		path: {
			type: String,
			default: 'a'
		},
		uploadFieldName: {
			type: String,
			default: 'image',
		},
		uploadUrl: String,
		fileUploadHandler: Function,
	},

	computed: {
		getUploadUrl() {
			return this.uploadUrl || `/uploads?path=${encodeURIComponent(this.path)}`;
		},
	},

	mounted() {
		this.initailize();
	},

	methods: {
		initailize() {
			const mdeConfig = Object.assign({
				element: this.$el,
				initialValue: this.currentValue,
				renderingConfig: {},
			}, this.simpleMdeConfig);

			if (mdeConfig.initialValue) {
				this.$emit('input', mdeConfig.initialValue);
			}

			const simplemde = new SimpleMDE(mdeConfig);

			inlineAttachment.editors.codemirror4.attach(simplemde.codemirror, {
				uploadUrl: this.getUploadUrl,
				uploadFieldName: this.uploadFieldName,
				onFileUploadResponse: (res) => {
					if (this.fileUploadHandler) {
						this.fileUploadHandler(res);
						return;
					}
				},
			});

			simplemde.codemirror.on('change', () => {
				this.$emit('input', simplemde.value());
			});
		},
	}
};
</script>
