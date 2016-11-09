require 'compass/import-once/activate'
Encoding.default_external = Encoding.find('utf-8')
# Require any additional compass plugins here.

# Set this to the root of your project when deployed:
project_path = "css3"
http_path = "../"
css_dir = "css"
sass_dir = "scss"
images_dir = "images"
javascripts_dir = "js"
sourcemap = true

# You can select your preferred output style here (can be overridden via the command line):
# output_style = :expanded or :nested or :compact or :compressed
output_style = :expanded

# To enable relative paths to assets via compass helper functions. Uncomment:
# relative_assets = true

# To disable debugging comments that display the original location of your selectors. Uncomment:
line_comments = false

# If you prefer the indented syntax, you might want to regenerate this
# project again passing --syntax sass, or you can uncomment this:
# preferred_syntax = :sass
# and then run:
# sass-convert -R --from scss --to sass sass scss && rm -rf sass && mv scss sass

# 这里做了一个 copy 而不是直接重命名；你可以用 FileUtils.mv 直接重命名
on_sprite_saved do |filename|
  if File.exists?(filename)
    FileUtils.cp filename, filename.gsub(%r{-s[a-z0-9]{10}\.png$}, '.png')
  end
end

# 除此之外，样式表里自动生成的声明也要修改一下
on_stylesheet_saved do |filename|
  if File.exists?(filename)
    css = File.read filename
    File.open(filename, 'w+') do |buffer|
      buffer << css.gsub(%r{-s[a-z0-9]{10}\.png}, '.png')
    end
  end
end
