import zyuiicon from '@/assets/font/scicon/iconfont.json'


//图标选择器配置
export default {
	icons: [
		{
			name: 'ZYUI',
			namespace: 'zy-icon-',
			icons: zyuiicon.glyphs.map(v => v.font_class)
		}
	]
}
